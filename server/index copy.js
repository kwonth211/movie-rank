// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server-express"
import { graphqlExpress, grahpqlIExpress } from "apollo-server-express"
import resolvers from "./graphql/resolvers"
import typeDefs from "./graphql/typeDefs"
import context from "./graphql/context"
import users from "./graphql/users"
import express from "express"
// import bodyParser from "body-parser"
import { makeExecutableSchema } from "graphql-tools"

// import Koa from "koa"
import bodyParser from "body-parser"
// import { ApolloServer } from "apollo-server-koa"
import mongoose from "mongoose"
const USER = mongoose.model("user", { ID: String, password: String })
// users.forEach((iter) => {
//   console.log(iter);
//   new USER(iter).save();
// });

const app = express()

app.use(express.json())

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context,
// })

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: ({ user: USER } = () => {}),
})

const apollo = new ApolloServer({
  schema,
})
apollo.applyMiddleware({ app })

// app.use("/graphql", bodyParser.json(), graphqlExpress({ schema, context: { users: users } }))
// app.use("/graphiql", grahpqlIExpress({ endpointURL: "/graphql" }))
// server.start(() => console.log("GraphQL Server Running"))
// // server.listen(4000).then(({ url }) => {
// //   console.log(`🚀 Server ready at ${url}`)
// })
app.listen(4000, () => {
  console.log("서버가 시작되었습니다")
})
