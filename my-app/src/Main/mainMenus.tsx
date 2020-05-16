import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { Route, Link } from "react-router-dom";

const images = [
  {
    url: "http://www.newsinside.kr/news/photo/201906/839207_533297_015.jpg",
    title: "VS",
    width: "35%",
    route: "/vs",
  },
  {
    url:
      "https://post-phinf.pstatic.net/MjAyMDAzMjdfMjQ5/MDAxNTg1MjkzNzk0OTk1.pGAH-7FbZGmChQVptj3KUwy4slvcpSnIpTLzYXqSMb4g.spSBToQADvQDeWGszVQCeoJmRbXno9AdWpY4GW7qqT8g.JPEG/1.jpg?type=w1200",
    title: "취향 분석",
    width: "30%",
  },
  //   <EditIcon></EditIcon>,
  {
    url:
      "https://lh3.googleusercontent.com/proxy/hJ4DPYa5Jp8aUBtmpM440FJr2mq1B704Rn6cElbrapNUTQsxeY_NQJW3ecW9t7XKQ-TCImt3zvPrRHJL8a4DkR5tPNvibyim7qdiviSvcmCIZ_NDYzN8",
    title: "자유 게시판",
    width: "30%",
    route: "/borad",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 300,
      width: "100%",
    },
    image: {
      position: "relative",
      height: 200,
      margin: "5px",
      [theme.breakpoints.down("xs")]: {
        width: "80% !important", // Overrides inline-style
        height: "80",
      },
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.15,
        },
        "& $imageMarked": {
          opacity: 0,
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
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity"),
    },
    imageTitle: {
      position: "relative",
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
        return (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
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
