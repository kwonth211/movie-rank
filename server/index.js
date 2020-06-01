// const { ApolloServer, gql } = require("apollo-server");

import { graphqlExpress, grahpqlIExpress } from "apollo-server-express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import context from "./graphql/context";
import mongoose from "mongoose";
import users from "./graphql/users";
import express from "express";
import bodyParser from "body-parser";
import { makeExecutableSchema } from "graphql-tools";
const USER = mongoose.model("user", { ID: String, password: String });
// users.forEach((iter) => {
//   console.log(iter);
//   new USER(iter).save();
// });

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context,
// });

const schema = makeExecutableSchema({
  typeDefs: typeDefs2,
  resolvers,
});

///applyMiddleware 적용
const app = express();
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { users: users } })
);
app.use("/graphiql", grahpqlIExpress({ endpointURL: "/graphql" }));
// server.start(() => console.log("GraphQL Server Running"));
// server.listen(4000).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
app.listen(4000, () => {
  "서버가 시작되었습니다";
});
