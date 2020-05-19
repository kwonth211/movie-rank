import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ApolloProvider } from "@apollo/react-hooks"
import context from "./graphql/context"
import client from "./graphql/apollo"
// import ApolloServer from "apollo-server"
// import dbTypes from "./database/dbTypes"
import resolver from "./graphql/resolver"
import { ApolloServer } from "apollo-server"
const yourQuery = require("./database/dbTypes")

// const server = new ApolloServer({
//   // yourQuery,
//   resolver,
//   context,
// })
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
