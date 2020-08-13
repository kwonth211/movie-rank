import React from "react";
import { Grid } from "@material-ui/core";

import {
  TotalVoters,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  GenreGraph,
  LatestProducts,
  RealtimeVoting,
} from "./components";
// import { TotalVoters, RealtimeVoting } from "./components"
// import { LatestOrders } from "./components"

import {
  Theme,
  makeStyles,
  createStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

// const {  } = require("./components")
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalVoters />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        <Grid item lg={7} md={8} xl={6} xs={12}>
          <LatestSales />
        </Grid>
        <Grid item lg={5} md={6} xl={3} xs={12}>
          <RealtimeVoting />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <LatestProducts />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <GenreGraph />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
