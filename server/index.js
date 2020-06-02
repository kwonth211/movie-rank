// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server"
import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"
import mongoose from "mongoose"

const USER = mongoose.model("user", {
  no: Number,
  mail: String,
  ID: String,
  password: String,
  role: String,
  token: String,
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    users: USER,
  },
})

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
