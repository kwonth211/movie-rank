import { gql } from "apollo-server"

const typeDefs = gql`
  type User {
    no: Int!
    ID: String!
    name: String
    passwordHash: String
    role: String!
    token: String
  }
  type Movies {
    imgUrl: String
    cast: [String]
    runtime: String
    released: [String]
    directors: [String]
    writers: [String]
    # // awards :   ??
    year: String
    countries: [String]
    languages: [String]
    # // ProductionCost: String
    profit: String
    name: String
    votes: Int!
    hashTag: [String]
    genre: [String]
  }
  type Query {
    me: User!
    getMovieGenre(genre: String!): [Movies!]
    getMovieAll: [Movies!]
  }
  type Mutation {
    duplicateCheck(ID: String!): Boolean
    signup(name: String!, ID: String!, password: String!): Boolean!
    login(ID: String!, password: String!): User
    logout: Boolean!
    emailAuth(mail: String!): String!
  }
`

export default typeDefs
