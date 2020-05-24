import React, { useState } from "react";
// import React from "react"
import logo from "./logo.svg";
import { type } from "os";
import Greetings from "../Main/main";
import {
  Button,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
} from "@material-ui/core";
import Header from "../header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import LoginForm from "./router/login"
import LoginForm from "../components/Login";
import SignUp from "../components/SignUp";
import Vs from "../Menu/VS/vs";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import navigation from "../navigation";
import { mainListItems, secondaryListItems } from "../header/listItmes";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      color: "primary",
      backgroundColor: "",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
  })
);
const drawerWidth = 240;

export default function RouterComponent() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={Greetings}
          name="hello world"
          mark="!!!!!"
        />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUp} />
        <Route path="/vs" component={Vs} />
      </Switch>
    </Router>
  );
}
