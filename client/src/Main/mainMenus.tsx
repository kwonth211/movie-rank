import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { Route, Link } from "react-router-dom";
// import icon from "../media/icons1.png";
let vsIcon = require("../media/icon1.png");
let analysis = require("../media/analysis.png");
let review = require("../media/review.png");
const images = [
  {
    url: vsIcon,
    title: "VS",
    width: "23%",
    route: "/vs",
  },
  {
    url: analysis,
    title: "취향 분석",
    width: "23%",
  },
  //   <EditIcon></EditIcon>,
  {
    url: review,
    title: "자유 게시판",
    width: "23%",
    route: "/borad",
  },
  {
    url: "",
    // "https://lh3.googleusercontent.com/proxy/hJ4DPYa5Jp8aUBtmpM440FJr2mq1B704Rn6cElbrapNUTQsxeY_NQJW3ecW9t7XKQ-TCImt3zvPrRHJL8a4DkR5tPNvibyim7qdiviSvcmCIZ_NDYzN8",
    title: "자유 게시판",
    width: "23%",
    route: "/borad",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 400,
      width: "100%",
      paddingTop: "10px",
      paddingBottom: "10px",
      // paddingLeft: "20px",
      // marginLeft: "px",
    },
    image: {
      position: "relative",
      height: 200,
      width: 100,
      margin: "5px",

      [theme.breakpoints.down("xs")]: {
        width: "80% !important", // Overrides inline-style
        height: "80",
      },
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.2,
        },
        "& $imageMarked": {
          opacity: 0.8,
        },
        "& $imageTitle": {
          border: "4px solid currentColor",
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#660000",
      border: "2px solid #660000",
      borderRadius: "30px",
    },
    imageSrc: {
      position: "absolute",
      width: "50%",
      height: "50%",
      left: 50,
      right: 0,
      top: 50,
      bottom: 0,

      backgroundSize: "cover",
      backgroundPosition: "center 40%",
      borderRadius: "30px",
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,

      backgroundColor: "#FFBEBE",
      opacity: 0.4,
      transition: theme.transitions.create("opacity"),
      borderRadius: "30px",
    },
    imageTitle: {
      position: "relative",
      fontWeight: "bold",

      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
        theme.spacing(1) + 6
      }px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity"),
    },
  })
);

export default function ButtonBases() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {images.map((image, i) => {
        console.log(`url(${image.url})`);
        return (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
              marginRight: "11px",
            }}
          >
            <Link to={image.route}>
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </Link>
          </ButtonBase>
        );
      })}
    </div>
  );
}
