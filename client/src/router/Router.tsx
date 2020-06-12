import React, { useState, useContext } from "react"
import Greetings from "../Main/main"
import Header from "../header/header"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginForm from "../components/Login"
import SignUp from "../components/SignUp"
import Vs from "../Menu/VS/vs"
import UserContext from "./../context/userContext"
import AuthRouter from "./AuthRouter"

export default function RouterComponent() {
  // const { user, setUser } = useContext(UserContext)

  // console.log(user)
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Greetings} name="hello world" mark="!!!!!" />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/vs" component={Vs} /> */}
        <AuthRouter path="/vs" component={Vs} />
      </Switch>
    </Router>
  )
}
