import { gql } from "apollo-server"

const typeDefs = gql`
  type User {
    id: Int!
    ID: String!
    password: String!
  }

  type Query {
    ...
    users: [User]!
  }
  
  type Mutation {
    ...
    addUser(ID: String!, password: String!): User
  }
  ...
`

export default typeDefs
