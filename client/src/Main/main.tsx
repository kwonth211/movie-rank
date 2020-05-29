import * as React from "react"
import { useState, useRef, useCallback } from "react"
import { Button, AppBar, IconButton, Typography, Toolbar } from "@material-ui/core"
import { createStyles, makeStyles, Theme, fade } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import MainCard from "./mainCard"
import MainMenus from "./mainMenus"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

// import * as Pagination from "./mainPagination";
import CustomPaginationActionsTable from "./mainPagination"
const drawerWidth = 240

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  heroContent: {
    padding: theme.spacing(0, 0, 3),
    fontFamily: "Fredoka One",
    // cursive,
    // <font-family></font-family>
  },
  cardHeader: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    // borderTop: `1px solid ${theme.palette.divider}`,
    // marginTop: theme.spacing(20),
    // paddingTop: theme.spacing(20),
    // paddingBottom: theme.spacing(3),
    // [theme.breakpoints.up("sm")]: {
    //   paddingTop: theme.spacing(20),
    //   paddingBottom: theme.spacing(1),
    // },
  },
  typography: {
    fontFamily: "Raleway, Arial",
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
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
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
  warpCard: {
    paddingLeft: "120px",
    paddingRight: "120px",
  },
}))

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: ["Cool stuff", "Random feature", "Team feature", "Developer stuff", "Another one"],
  },
  {
    title: "Resources",
    description: ["Resource", "Resource name", "Another resource", "Final resource"],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
]

type GreetingsProps = {
  name: string
  mark: string
  count: number
}
interface IGreertingProps {}

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  },
})

export default function Main({ name, mark, count }: GreetingsProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white" }}>
        <CssBaseline />

        {/* Hero unit */}
        {/* <Container style={{}} maxWidth="md" component="main"> */}
        <MainMenus />
        {/* </Container> */}

        <div className={classes.warpCard}>
          <div style={{ float: "left" }}>
            <MainCard />
          </div>
          <div style={{ float: "right" }}>
            <CustomPaginationActionsTable />
          </div>
        </div>

        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid container spacing={4} justify="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#" variant="subtitle1" color="textSecondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>

        {/* End footer */}
      </div>
    </React.Fragment>
  )
}

Main.defaultProps = {
  mark: "!",
}

// Greetings;
