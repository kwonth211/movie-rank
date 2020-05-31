import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  request: (operation) => {
    const token = localStorage.getItem("token");
    console.log(localStorage);
    console.log(operation);
    operation.setContext({
      headers: {
        authorization: `${token}`,
      },
    });
  },
});
export default client;
