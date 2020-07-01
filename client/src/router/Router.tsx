import React from "react";
import Greetings from "../views/Main/Main";
import Header from "../header/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "../views/Login/Login";
import SignUp from "../views/Login/SignUp";
import Vs from "../views/Menu/Vs/vs";
import Vote from "../views/Main/SearhMain/SearchMain";
import AuthRouter from "./AuthRouter";
import MovieDetail from "../views/Menu/MovieDetail/movieDetail";
import analysis from "../views/Menu/Analysis/analysis";
import ScrollToTop from "./ScrollToTop";

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
          {/* <AuthRouter path="/vote" component={Vote} /> */}
          <AuthRouter path="/movieDetail" component={MovieDetail} />
          <AuthRouter path="/analysis" component={analysis} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}
