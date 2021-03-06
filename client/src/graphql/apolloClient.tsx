import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  // uri: "http://192.168.1.103:4000/",
  uri: "http://localhost:4000/",
  request: (operation) => {
    const token = localStorage.getItem("token")
    operation.setContext({
      headers: {
        authorization: `${token}`,
      },
    })
  },
})
export default client
