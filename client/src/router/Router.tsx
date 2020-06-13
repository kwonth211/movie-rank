import React, { useState, useContext } from "react"
import Greetings from "../Main/main"
import Header from "../header/header"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginForm from "../components/Login"
import SignUp from "../components/SignUp"
import Vs from "../Menu/VS/vs"
import Vote from "../Menu/vote/Vote"
import AuthRouter from "./AuthRouter"

export default function RouterComponent() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Greetings} name="hello world" mark="!!!!!" />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/vs" component={Vs} /> */}
        {/* <Route path="/vs" component={Vs} />
         */}
        <AuthRouter path="/vs" component={Vs} />
        <AuthRouter path="/vote" component={Vote} />
      </Switch>
    </Router>
  )
}
