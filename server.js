const express = require('express');
require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const db = require('./models');

async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            db
        }
    });
    await server.start();

    server.applyMiddleware({ app });

    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT + "" + server.graphqlPath}`);
    return { server, app };
}

startApolloServer();