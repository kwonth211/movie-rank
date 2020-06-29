import React from "react"
import Greetings from "../views/Main/main"
import Header from "../header/header"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginForm from "../views/Login/Login"
import SignUp from "../views/SignUp/SignUp"
import Vs from "../views/Menu/VS/vs"
import Vote from "../views/Menu/vote/Vote"
import AuthRouter from "./AuthRouter"
import MovieDetail from "../views/Menu/vote/movieDetail"
import analysis from "../views/Menu/analysis/analysis"
import ScrollToTop from "./ScrollToTop"

export default function RouterComponent() {
  return (
    <Router>
      <ScrollToTop>
        <Header />
        <Switch>
          <Route exact path="/" component={Greetings} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignUp} />
          <AuthRouter path="/vs" component={Vs} />
          <AuthRouter path="/vote" component={Vote} />
          <AuthRouter path="/movieDetail" component={MovieDetail} />
          <AuthRouter path="/analysis" component={analysis} />
        </Switch>
      </ScrollToTop>
    </Router>
  )
}
