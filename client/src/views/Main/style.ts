import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 240

export const useStyles = makeStyles((theme) => ({
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
    // marginTop: theme.spacing(20),
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      // paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(1),
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
  warpCard: {
    //   paddingLeft: "120px",
    //   paddingRight: "120px",
    //   backgroundColor: "red",
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: "20px",
    paddingLeft: "120px",
  },
  DashBoard: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "rgb(240,240,240)",
  },
}))
