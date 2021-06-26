const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        id: ID!,
        name: String!,
        description: String,
        genre: String!,
        price: Float!,
        author: Author
    }

    type Author {
        id: ID!,
        name: String!,
    }

    type User {
        id: ID!,
        email: String!,
        password: String!,
        token: String!
    }

    type BookUpdateResponse {
        success: Boolean!,
        message: String,
    }

    type Query {
        books: [Book],
        book(id: ID!): Book,
        authors: [Author],
        author(id: ID!): Author, 
        me: User
    }

    type Mutation {
        bookUpdate(bookId: ID!): BookUpdateResponse,
        bookDelete(bookId: ID!): BookUpdateResponse,
        login(email: String, password: String): User
    }
`;

module.exports = {typeDefs}