import React, { useEffect, useState, useRef, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import gql from "../../../graphql/query";
import { useLazyQuery } from "@apollo/react-hooks";
import ProgressModelComponent from "../../../common/ProgressModelComponent";
import { IMovie } from "../../../interface/IMovie";
import { useStyles } from "./style";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MymovieDialog from "./components/MymovieDialog";
import useScroll from "../../../common/scroll/Scroll";

const VsGridList: React.FunctionComponent<{ genre: String }> = ({ genre }) => {
  let [totalPickCount, setTotalPickCount] = useState<Number[]>([]);
  const classes = useStyles();
  const [totalImage, setTotalImage] = useState<IMovie[]>([]);

  const [fixtotalImage, setFixtotalImage] = useState<IMovie[]>([]);

  const [getMovieGenre, { called, loading, data }] = useLazyQuery(
    gql.GETMOVIEGENRE
  );
  const [imageArr, setImageArr] = useState<IMovie[]>([]);
  const [modalFlag, setModalFlag] = useState(false);
  let darkness = useRef<HTMLDivElement | null[]>([]);
  let btn = useRef<HTMLDivElement | null[]>([]);
  let [pickCount, setPickCount] = useState(0);
  const { percentage } = useScroll();

  useEffect(() => {
    getMovieGenre({ variables: { genre } });
    let imageList = data?.getMovieGenre;
    // 60개의 배열을 미리 담아둔다
    if (imageList) {
      imageList = imageList.filter((iter) => {
        if (iter.imgUrl) {
          return iter;
        }
      });
      let totalImageTemp = [];
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
          const randomInt =
            Math.floor(Math.random() * (imageList.length - 0 + 1)) + 0;
          let spliceData = imageList.splice(randomInt - 1, 1)[0];
          if (spliceData && Object.keys(spliceData).length > 0) {
            totalImageTemp = totalImageTemp.concat(spliceData);
          }
        }
      }
      setTotalImage([...totalImageTemp]);
      setFixtotalImage([...totalImageTemp]);
    }
  }, [data]);

  useEffect(() => {
    // debugger;
    setImageArr(totalImage.splice(0, 18));
  }, [totalImage]);

  useEffect(() => {
    if (percentage >= 80) {
      setImageArr([...imageArr, ...totalImage.splice(0, 6)]);
    }
  }, [percentage]);

  // const modalCallback = useCallback(
  //   (a) => {
  //     if (a && Array.isArray(a)) {
  //       setTotalImage(a)
  //       setFixtotalImage(a)
  //     } else {
  //       console.log(fixtotalImage)
  //       setTotalImage(fixtotalImage)
  //       // setFixtotalImage(fixtotalImage)
  //     }
  //     setModalFlag(!modalFlag)
  //   },
  //   [modalFlag, fixtotalImage]
  // )

  const modalCallback = (movies) => {
    if (movies && Array.isArray(movies)) {
      // console.log(movies);
      setTotalImage([...movies]);
      setFixtotalImage([...movies]);
    } else {
    }
    setModalFlag(!modalFlag);
  };

  const imageClickEvent = (i) => {
    if (darkness.current[i].style.opacity == 0.6) {
      darkness.current[i].style.opacity = 0;
      btn.current[i].style.opacity = 0;
      btn.current[i].style.transform = "";
      // const findIndex = totalPickCount[pageCount].findIndex((index) => i)
      // totalPickCount[pageCount].splice(findIndex, 1)
    } else {
      if (pickCount !== 16) {
        darkness.current[i].style.opacity = 0.6;
        btn.current[i].style.opacity = 1;
        btn.current[i].style.transform = "scale(1)";

        // totalPickCount[pageCount].push(i)
        setTotalPickCount(totalPickCount);
      }
    }

    let tempCount = 0;
    for (let i = 0; i < 4; i++) {
      // tempCount += totalPickCount[i].length
    }

    setPickCount(tempCount);
  };
  if (called && loading) return <ProgressModelComponent />;

  return (
    <React.Fragment>
      <CssBaseline />

      <main id={"top"}>
        {/* Hero unit */}
        <MymovieDialog
          open={modalFlag}
          callback={modalCallback}
          totalImage={fixtotalImage}
        />

        <Fab
          className={classes.addButton}
          color="primary"
          aria-label="add"
          onClick={modalCallback}
        >
          <AddIcon />
        </Fab>

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h5"
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              권태훈 님 , 좋아하는 영화 총 16개를 PICK 해주세요
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              최종 선택 1개의 영화가 투표권수 1개 입니다.
            </Typography>
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>원하는 영화가 없으십니까?</Grid>
                <Grid item>
                  <div className={"count"}> <span draggable="false">{pickCount}/16</span> </div>
                </Grid>
              </Grid>
            </div> */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <div
            onClick={modalCallback}
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "blue",
              cursor: "pointer",
            }}
          >
            원하는 영화가 없으십니까?
          </div>

          <Grid container spacing={3}>
            {imageArr.map((iterImage, i) => (
              <Grid item key={i} sm={2} md={2}>
                <Card
                  style={{ height: "175px", width: "125px" }}
                  className={classes.card}
                >
                  <CardMedia
                    className={"tracking-in-contract-bck"}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    image={
                      iterImage?.imgUrl?.indexOf("https://") === -1
                        ? "https://" + iterImage.imgUrl
                        : iterImage.imgUrl
                    }
                    title={iterImage.name}
                    onClick={() => {
                      if (pickCount <= 16) imageClickEvent(i);

                      // console.log(totalPickCount)
                      // debugger
                    }}
                  >
                    <div
                      ref={(el) => {
                        darkness.current[i] = el;
                      }}
                      // style={{ opacity: true ? 0.7 : 0.2 }}
                      className="darkness"
                    ></div>
                    <div
                      ref={(el) => {
                        btn.current[i] = el;
                      }}
                      className="btn-plus"
                    >
                      <span draggable="false">♡</span>
                    </div>
                  </CardMedia>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}></footer>
      {/* End footer */}
    </React.Fragment>
  );
};

export default VsGridList;
