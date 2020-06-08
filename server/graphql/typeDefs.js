import { gql } from "apollo-server"

const typeDefs = gql`
  type User {
    no: Int!
    mail: String
    ID: String!
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
  # type Query {
  #   me: users!
  #   users: String
  # }
  type Query {
    me: User!
    getMovieGenre(genre: String!): [Movies!]
  }
  type Mutation {
    signup(mail: String!, ID: String!, password: String!): Boolean!
    login(ID: String!, password: String!): User
    logout: Boolean!
  }
`

export default typeDefs
