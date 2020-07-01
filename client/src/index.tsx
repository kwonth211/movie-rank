import React from "react";
import ReactDOM from "react-dom";
// import "./index.css"
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/apolloClient";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "react-app-polyfill/ie9";
ReactDOM.render(
  <ApolloProvider client={client}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ApolloProvider>,
  document.getElementById("root")
);

// serviceWorker.unregister()
