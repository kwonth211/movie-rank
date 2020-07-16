import * as React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Button,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import MainCard from "./ranking/mainCard";
import MainMenus from "./Banner/MainMenus";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchMain from "./SearhMain/SearchMain";
// import * as Pagination from "./mainPagination";
import CustomPaginationActionsTable from "./ranking/mainPagination";
import Title from "./hotIssue/Title";
import DashBoard from "./hotIssue/DashBoard";
import RealtimeVoting from "../Menu/Analysis/components/RealtimeVoting";
import { RankingList } from "./SearhMain/components/RankingList";
import { useStyles } from "./style";
import { useRecoilValue } from "recoil";
import { AllMovieState } from "../../atoms";
import { IMovie } from "../../interface/IMovie";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Websiteddd
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

export default function Main() {
  const classes = useStyles();

  const allMovieList = useRecoilValue<IMovie[]>(AllMovieState);
  const [rankMovie, setRankMovie] = useState<IMovie[] | []>([]);

  useEffect(() => {
    setRankMovie(allMovieList.slice(0, 5)); // rank만 정렬해서 props 로 내려줄
  }, [allMovieList]);

  // const rankMovieCallback = (number) => {
  //   setRankMovie(allMovieList.slice(0, number))
  // }
  const rankMovieCallback = useCallback(
    (number) => {
      setRankMovie(allMovieList.slice(0, number));
    },
    [rankMovie]
  );

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white", height: "100%" }}>
        <CssBaseline />

        <MainMenus />

        <div>
          <Grid container spacing={10}>
            <Grid
              style={{ marginRight: "0px", paddingRight: "0px" }}
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <SearchMain
                rankMovie={rankMovie}
                rankMovieCallback={rankMovieCallback}
              />
            </Grid>

            <RankingList
              rankMovie={rankMovie}
              rankMovieCallback={rankMovieCallback}
            />
          </Grid>
        </div>
      </div>

      <div className={classes.footer}>{Copyright()}</div>
    </React.Fragment>
  );
}

// Greetings;
