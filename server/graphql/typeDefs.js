import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: Int!
    mail: String
    ID: String!
    passwordHash: String
    role: [String!]!
    token: String
  }

  type Query {
    me: User!
    users: String
  }
  type Mutation {
    signup(mail: String!, ID: String!, password: String!): Boolean!
    login(ID: String!, password: String!): User
    logout: Boolean!
  }
`;

export default typeDefs;
