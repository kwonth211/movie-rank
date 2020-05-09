import React, { useState } from "react"
// import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { type } from "os"
import Greetings from "./components/main"
import { Button, AppBar, IconButton, Typography, Toolbar } from "@material-ui/core/"
import Header from "./header"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginForm from "./router/login"

function App() {
  //const a = useState
  const [a, setA] = useState(1)

  let callback = {
    setState: (count: number) => {
      setA(count + 1)
    },
  }

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/main" component={Greetings} name="hello world" mark="!!!!!" />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
