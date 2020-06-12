import RouterComponent from "./router/Router"
import React, { useState, useEffect } from "react"
// import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import UserContext from "./context/userContext"
import gql from "./graphql/query"

function App() {
  const [user, setUser] = useState(null)
  const { data } = useQuery(gql.ME)

  console.log("data>>>>", data)

  useEffect(() => {
    if (data?.me) setUser(data.me)
  }, [data])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterComponent />
    </UserContext.Provider>
  )
}

export default App
