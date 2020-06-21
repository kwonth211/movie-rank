// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import context from "./graphql/context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen(process.env.port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
