import { GraphQLServer } from "graphql-yoga"
import { ApolloServer, gql } from "apollo-server-express"
import teamData from "./mockup/teamData.json"

const resolver = {
  Query: {
    members: () => teamData,
  },
}

const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql", // add this code
  resolvers: resolver,
})

// const server = new GraphQLServer({
//     typeDefs: "graphql/schema.graphql", // add this code
//     resolvers // add this code
// })
server.start(() => console.log("GraphQL Server Running"))

// server.applyMiddleware({
//   app,
//   path: "/graphql",
// })

// app.listen({ port: 7077 }, () => {
//   console.log("server 7077 port start")
// })
