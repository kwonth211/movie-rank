import React, { useState, useRef } from "react"
import { Theme, makeStyles, createStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import EditIcon from "@material-ui/icons/Edit"
import { Route, Link } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { green, purple } from "@material-ui/core/colors"
import Button from "@material-ui/core/Button"
// import icon from "../media/icons1.png";
let vsIcon = require("../media/icon1.png")
let analysis = require("../media/analysis.png")
let review = require("../media/review.png")
let vote = require("../media/vote.png")

const images = [
  {
    url: vote,
    title: "투표하러 가기",
    width: "23%",
    route: "/vote",
    text: (
      <h4>
        본인만의 인생 영화를
        <br /> 투표하고 공유하세요!
      </h4>
    ),
  },
  {
    url: vsIcon,
    title: "영화 대 영화",
    width: "23%",
    route: "/vs",
    text: (
      <h4>
        장르별 영화 월드컵을 <br /> 진행해보세요!
      </h4>
    ),
  },
  {
    url: analysis,
    title: "취향 분석 하러가기",
    width: "23%",
    text: (
      <h4>
        본인에 맞는 취향을 <br /> 그래프를 통해 확인하세요!
      </h4>
    ),
  },
  //   <EditIcon></EditIcon>,
  {
    url: review,
    title: "자유 게시판",
    width: "23%",
    route: "/borad",
    text: (
      <h4>
        인생영화 후기를 <br /> 작성하고 공유하세요!
      </h4>
    ),
  },
  // {
  //   url: "",
  //   // "https://lh3.googleusercontent.com/proxy/hJ4DPYa5Jp8aUBtmpM440FJr2mq1B704Rn6cElbrapNUTQsxeY_NQJW3ecW9t7XKQ-TCImt3zvPrRHJL8a4DkR5tPNvibyim7qdiviSvcmCIZ_NDYzN8",
  //   title: "자유 게시판",
  //   width: "23%",
  //   route: "/borad",
  // },
]

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
  typography: {
    // fontFamily: "MapoGoldenPier !important",
    fontFamily: "Noto Sans KR !important",
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: "flex",
      // flexWrap: "wrap",
      // minWidth: 400,
      // backgroundColor: "white",
      // background "white",
      // width: "200px",
      // paddingLeft: "0px",
      // height: "500px",
      // paddingBottom: "10px",
      // paddingLeft: "20px",
      // marginLeft: "px",
    },
    image: {
      // position: "relative",
      height: "300px",
      width: "300px",
      // margin: "5px",

      [theme.breakpoints.down("xs")]: {
        width: "80% !important", // Overrides inline-style
        height: "80",
      },
      // "&:hover, &$focusVisible": {
      //   zIndex: 1,
      //   "& $imageBackdrop": {
      //     opacity: 0.2,
      //   },
      //   "& $imageMarked": {
      //     opacity: 0.8,
      //   },
      //   "& $imageTitle": {
      //     // border: "4px solid currentColor",
      //   },
      // },
    },
    focusVisible: {},
    imageButton: {
      // position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      // bottom: 0,
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
      color: "black",
      // border: "2px solid black",
      borderRadius: "30px",
    },
    imageSrc: {
      position: "absolute",
      width: "50%",
      height: "50%",
      left: 220,
      right: 0,
      top: 50,
      bottom: 0,

      backgroundSize: "cover",
      // backgroundPosition: "center 40%",
      borderRadius: "30px",
    },
    imageBackdrop: {
      // position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      // backgroundColor: "#00006c",
      opacity: 0.4,
      // transition: theme.transitions.create("opacity"),
      borderRadius: "30px",
    },
    imageTitle: {
      // position: "relative",
      fontWeight: "bold",

      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      // position: "absolute",
      bottom: -2,
      // left: "calc(50% - 9px)",
      // transition: theme.transitions.create("opacity"),
    },
    slide: {
      height: "500px",
    },
    title: {
      float: "left",
      display: "inlineFlex",
      verticalAlign: "middle",
      // paddingLeft: "300px",
      // marginLeft: "300px",
      position: "absolute",
      width: "50%",
      height: "50%",
      left: 150,
      right: 0,
      top: 10,
      bottom: 0,
    },
  })
)

export default function ButtonBases() {
  const classes = useStyles()
  let carRef = useRef(undefined)

  return (
    <div className={classes.root} style={{ backgroundColor: "white" }}>
      <Carousel
        ref={(ref) => {
          // carRef = ref
        }}
        // key={"key1"}
        className={"slide"}
        // showArrows={true}
        infiniteLoop={true}
        transitionTime={500}
        interval={4000}
        autoPlay={true}
      >
        {images.map((image, i) => {
          return (
            <div>
              <div className={classes.title}>
                <ThemeProvider theme={theme}>
                  <Typography style={{ marginBottom: "-20px", fontSize: "30px" }} component="h4" variant="h5" align="center">
                    {/* Movie Ranking 본인만의 인생 영화를 <br />
                  투표하고 공유하세요! */}
                    {image.text}
                  </Typography>

                  <Link style={{ textDecoration: "none" }} to={image.route}>
                    <Button variant="contained" style={{ fontSize: "15px", background: "rgb(97,200,142)", color: "white" }}>
                      <div style={{ fontWeight: "bold" }}>{image.title}</div>
                    </Button>
                  </Link>
                </ThemeProvider>
              </div>

              <Button
                // focusRipple
                key={image.title}
                className={classes.image}
                disabled
              >
                <div>
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  />
                  {/* <span className={classes.imageBackdrop} /> */}
                  {/* <span className={classes.imageButton}> */}
                  <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
                    <span className={classes.imageMarked} />
                  </Typography>

                  {/* </span> */}
                </div>
              </Button>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}
