import { makeStyles } from "@material-ui/core/styles"

// @keyframes fadein {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }

// /* Firefox < 16 */
// @-moz-keyframes fadein {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }

// /* Safari, Chrome and Opera > 12.1 */
// @-webkit-keyframes fadein {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }

// /* Internet Explorer */
// @-ms-keyframes fadein {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }

// /* Opera < 12.1 */
// @-o-keyframes fadein {
//   from { opacity: 0; }
//   to   { opacity: 1; }
// }
export const useStyles = makeStyles((theme) => ({
  "@-webkit-keyframes cardGrid": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  "@keyframes cardGrid": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },

  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // height: "100%",
    // width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 50,
    margin: 4,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2, 20),
    // paddingLeft: "300px",
    // marginLeft: "300px",

    // paddingLeft: theme.spacing(10),
  },
  heroButtons: {
    // marginTop: theme.spacing(6),
    // marginLeft: theme.spacing(20),
  },
  cardGrid: {
    // WebkitAnimation: "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
    // animation: "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
    animation: `$cardGrid 3000ms ${theme.transitions.easing.easeInOut}`,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    // paddingLeft: "20px",
    marginLeft: "10%",
    width: "55%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 2,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 156,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  carMapContainer: {
    "&:hover": {
      opacity: 1,
    },
    opacity: 0.8,
    boxShadow: theme.shadows[7],
    borderRadius: "20px",
    // opacity: 0.65,
    // borderTop: "1px solid rgb(224,224,224)",
    // borderRight: "1px solid rgb(224,224,224)",
    // borderLeft: "1px solid rgb(224,224,224)",
    borderBottom: "1px solid rgb(224,224,224)",
    // paddingTop: "15px", // 16:9
    marginBottom: "20px",
    cursor: "pointer",
  },
  star: {
    // paddingRight: "30px",
    // width: "10px",
  },
  starImage: {
    width: "20px",
    // paddingLeft: "5px",
    // paddingRight: "0px",
    // marginLeft: "2px",
  },
  underline: {
    "&&&:before": {
      borderBottom: "none !important",
    },
    "&&:after": {
      borderBottom: "none !important",
    },
  },
}))
