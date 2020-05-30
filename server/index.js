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

// server.applyMiddleware({
//   app,
//   path: "/graphql",
// })

// app.listen({ port: 7077 }, () => {
//   console.log("server 7077 port start")
// })

// const typeDefs = gql`
//   type Query {
//     me: User
//   }

//   type User {
//     id: ID!
//     username: String
//   }
// `;

// const resolvers = {
//   Query: {
//     me() {
//       return { id: "1", username: "@ava" }
//     }
//   }
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.listen(4001).then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
// });
