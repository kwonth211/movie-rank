import React from "react"
// import Greetings from "../views/Main/Main";
import Greetings from "../components/Main/Main"
import Header from "../header/header"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginForm from "../components/Login/Login"
import SignUp from "../components/Login/SignUp"
import vs from "../components/Menu/VS/vs"
import Vote from "../components/Main/SearhMain/SearchMain"
import AuthRouter from "./AuthRouter"
import MovieDetail from "../components/Menu/MovieDetail/movieDetail"
import analysis from "../components/Menu/analysis/analysis"
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
          <AuthRouter path="/vs" component={vs} />
          {/* <AuthRouter path="/vote" component={Vote} /> */}
          <AuthRouter path="/movieDetail" component={MovieDetail} />
          <AuthRouter path="/analysis" component={analysis} />
        </Switch>
      </ScrollToTop>
    </Router>
  )
}
