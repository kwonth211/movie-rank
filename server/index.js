// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server"
import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"
import context from "./graphql/context"
import mongoose from "mongoose"

mongoose
  .connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0-umti3.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (response) => {
    console.log("몽구스 연결 성공")
  })

  .catch((err) => {
    console.log(err)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen(process.env.port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
