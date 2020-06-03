import React, { useState } from "react"
import Greetings from "../Main/main"
import Header from "../header/header"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginForm from "../components/Login"
import SignUp from "../components/SignUp"
import Vs from "../Menu/VS/vs"
import { fade, makeStyles, Theme, createStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
// import Logout from "../components/Logout"
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
)
const drawerWidth = 240

export default function RouterComponent() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Greetings} name="hello world" mark="!!!!!" />
        <Route path="/login" component={LoginForm} />
        {/* <Route path="/logout" component={Logout} /> */}
        <Route path="/signup" component={SignUp} />
        <Route path="/vs" component={Vs} />
      </Switch>
    </Router>
  )
}
