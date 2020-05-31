const { ApolloServer, gql } = require("apollo-server");

// import { ApolloServer, gql } from "apollo-server-express";
import teamData from "./mockup/teamData.json";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import context from "./graphql/context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

// server.start(() => console.log("GraphQL Server Running"));
server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
