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
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
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
      <CssBaseline />

      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
          Movie Ranking
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          본인만의 인생 영화를 투표하고 공유하세요!
        </Typography>
      </Container>
      {/* End hero unit */}
      <div style={{ backgroundColor: "" }}>
        <Container style={{}} maxWidth="md" component="main">
          <MainCard />
        </Container>
        {/* End card unit */}
        <Container style={{ marginTop: "15px", paddingBottom: "15px" }} maxWidth="md" component="main">
          <CustomPaginationActionsTable />
        </Container>
      </div>
      {/* End ranking unit */}
      <div style={{ backgroundColor: "white" }}>
        <Container style={{}} maxWidth="md" component="main">
          <MainMenus />
        </Container>
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
    </React.Fragment>
  )
}

Main.defaultProps = {
  mark: "!",
}

// Greetings;
