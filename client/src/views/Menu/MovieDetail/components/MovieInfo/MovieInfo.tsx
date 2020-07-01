import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import clsx from "clsx";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import { IMovie } from "../../../../../interface/IMovie";
import Button from "@material-ui/core/Button";
import useReactRouter from "use-react-router";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { useStyles } from "./style";
import Modal from "../../../../../common/Modal";
// import Modal from "./../../../common/Modal"
import useModal from "../../../../../common/useModal";

const MovieInfo: FunctionComponent<{ searchMovie: IMovie }> = ({
  searchMovie,
}) => {
  const classes = useStyles();
  const { history } = useReactRouter();

  const { modalFlag, toggle, modalTitle } = useModal();

  useEffect(() => {
    console.log(searchMovie);
    if (Object.keys(searchMovie).length === 0) {
      alert("검색된 결과가 없습니다.");
      history.replace("/");
    }
  }, [searchMovie]);

  const voteClick = () => {
    toggle();
  };

  if (Object.keys(searchMovie).length > 0) {
    return (
      <>
        <Card className={clsx(classes.root)}>
          <CardContent>
            <Grid container justify="space-between">
              <Grid item style={{ paddingTop: "38px" }}>
                <Typography variant="h5" style={{ display: "inline" }}>
                  {searchMovie.name}{" "}
                </Typography>
                <Typography
                  style={{ display: "inline" }}
                  color="textSecondary"
                  variant="h6"
                >
                  {searchMovie.englishName
                    ? "(" + searchMovie.englishName + ")"
                    : ""}
                </Typography>
                <br />
                <Typography className={classes.caption} variant="caption">
                  개요 :{" "}
                  {searchMovie.genre.map((iter, idx) =>
                    idx !== searchMovie.genre.length - 1 ? iter + " , " : iter
                  )}{" "}
                  |{" "}
                  {searchMovie.countries.map((iter, idx) =>
                    idx !== searchMovie.countries.length - 1
                      ? iter + " , "
                      : iter
                  )}{" "}
                  | {searchMovie.runtime}
                </Typography>
                <br />
                <Typography className={classes.caption} variant="caption">
                  개봉년도 : {searchMovie.year}년
                </Typography>
                <br />
                <Typography className={classes.caption} variant="caption">
                  감독 :{" "}
                  {searchMovie.directors.map((iter, idx) =>
                    idx !== searchMovie.directors.length - 1
                      ? iter + " , "
                      : iter
                  )}
                </Typography>
                <br />
                <Typography className={classes.caption} variant="caption">
                  저자 :{" "}
                  {searchMovie.writers.map((iter, idx) =>
                    idx !== searchMovie.writers.length - 1 ? iter + " , " : iter
                  )}
                </Typography>
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
                해쉬태그 :{" "}
                {searchMovie.hashTag.map((iter) => {
                  return <div style={{ display: "grid" }}>#{iter}</div>
                })}
              </Typography> */}
              </Grid>
              <Grid item>
                <div
                  ref={(el) => {
                    // btn.current[i] = el
                  }}
                  // className={classes.btnHeart}
                >
                  <span draggable="false" className={classes.heartSpan}>
                    {/* ♡  ♥*/}
                    <FavoriteRoundedIcon />
                  </span>
                </div>

                <div className={classes.image}>
                  <img
                    className={classes.img}
                    alt="noImage"
                    src={
                      searchMovie.imgUrl &&
                      searchMovie.imgUrl.indexOf("https://") === -1
                        ? "https://" + searchMovie.imgUrl
                        : searchMovie.imgUrl
                    }
                  />
                </div>
                <div className={classes.button}>
                  <Button
                    onClick={voteClick}
                    variant="outlined"
                    color="secondary"
                  >
                    투표 하기
                  </Button>
                </div>
              </Grid>
            </Grid>
            <div className={classes.difference}>
              {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
              <Typography className={classes.differenceValue} variant="body2">
                전체랭킹 : 4위
              </Typography>
              <Typography className={classes.differenceValue} variant="body2">
                투표 수 : 132
              </Typography>
              <Typography
                className={classes.caption}
                variant="caption"
              ></Typography>
            </div>
          </CardContent>
        </Card>

        <Modal
          modalFlag={modalFlag}
          toggle={toggle}
          title={"투표 하시겠습니까?"}
        />
      </>
    );
  } else {
    return null;
  }
};

export default MovieInfo;
