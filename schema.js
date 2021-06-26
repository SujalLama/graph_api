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
        age: Int!,
        books: [Book]
    }

    type User {
        id: ID!,
        email: String!,
        password: String!,
        token: String
    }

    type BookUpdateResponse {
        success: Boolean!,
        message: String,
    }

    type UserUpdateResponse {
        success: Boolean,
        message: String,
    }

    type Query {
        allBooks: [Book],
        getBook(id: ID!): Book,
        allAuthors: [Author],
        getAuthor(id: ID!): Author, 
        getUser(id: ID!): User,
        allUsers: [User]
    }

    type Mutation {
        createBook(
        name: String!, 
        description: String!,  
        genre: String!,
        price: Float!,
        authorId: ID!): Book!,
        createUser(email: String!, password: String!): User!,
        updateUser(id:ID!, email: String!): UserUpdateResponse,
        createAuthor(name: String!, age: Int,): Author!,
        bookUpdate(bookId: ID!): BookUpdateResponse,
        bookDelete(bookId: ID!): BookUpdateResponse,
        login(email: String, password: String): User,
        deleteBook(id: ID!): UserUpdateResponse,
        deleteAuthor(id: ID!): UserUpdateResponse,
    }
`;

const resolvers = {
    Query: {
        getUser: (parent, {id}, {db}) => db.User.findOne({where: {id}}),
        allUsers: (parent, args, {db}) => db.User.findAll({}),
        allAuthors: (parent, args, {db}) => db.Author.findAll({include: [db.Book]}),
        getAuthor: (parent, args, {db}) => db.Author.findOne({where: {id: args.id}, include: [db.Book]}),
        allBooks: (parent, args, {db}) => db.Book.findAll({include: [db.Author]}),
        getBook: (parent, args, {db}) => db.Book.findOne({where: {id: args.id}, include: [db.Author]})

    },
    Mutation: {
        createUser: (parent, args, context) => context.db.User.create(args),
        updateUser: (parent, args, {db}) => db.User.update({email: args.email}, {where: {id: args.id}}),
        createAuthor: (parent, args, {db}) => db.Author.create(args),
        deleteAuthor: (parent, args, {db}) => db.Author.destroy({where: {id: args.id}}),
        deleteBook: (parent, args, {db}) => db.Book.destroy({where: {id: args.id}}),
        createBook: (parent, args, {db}) => db.Book.create(args)
    }
}

module.exports = {typeDefs, resolvers}