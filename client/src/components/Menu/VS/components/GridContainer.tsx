import React, { useEffect, useState, useRef, useCallback, useReducer, FC, Dispatch } from "react"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { useStyles } from "./../style"
import { IMovie } from "../../../../interface/IMovie"

const GridContainer: FC<{ modalCallback: any; dispatch: any; imageArr: IMovie[]; pickMovie: IMovie[]; fixtotalImage: IMovie[]; tournamentStart: Function }> = ({ modalCallback, imageArr, dispatch, pickMovie, fixtotalImage, tournamentStart }) => {
  const classes = useStyles()

  let darkness = useRef<HTMLDivElement | null[]>([])
  let btn = useRef<HTMLDivElement | null[]>([])
  const pickCount = pickMovie.length

  const imageClickEvent = (i) => {
    if (btn.current[i].style.flag) {
      // 해제
      darkness.current[i].style.opacity = 0
      btn.current[i].style.opacity = 0
      btn.current[i].style.transform = ""
      btn.current[i].style.flag = false
      // setPickCount(--pickCount)
      pickMovie = pickMovie.filter((e, idx) => fixtotalImage[i].name !== e.name)
    } else {
      //추가
      if (pickCount === 15) {
        tournamentStart()
      } else if (pickCount >= 16) {
        return
      }
      pickMovie = pickMovie.concat(fixtotalImage[i])

      darkness.current[i].style.opacity = 0.7
      btn.current[i].style.opacity = 1
      btn.current[i].style.transform = "scale(1)"
      btn.current[i].style.flag = true
    }
    dispatch({
      type: "SET_PICKMOVIE",
      value: pickMovie,
    })
    // setPickMovie(pickMovie)
  }

  const hoverCancel = (index) => {
    if (!btn.current[index].style.flag) {
      //true 가 아닐때는 hover cancel
      darkness.current[index].style.opacity = 0
      btn.current[index].style.opacity = 0
      btn.current[index].style.transform = ""
    }
  }
  const hoverEvent = (index) => {
    if (!btn.current[index].style.flag) {
      darkness.current[index].style.opacity = 0.4
      btn.current[index].style.opacity = 1
      btn.current[index].style.transform = "scale(1)"
    }
  }

  return (
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
            <Card style={{ height: "175px", width: "125px" }} className={classes.card}>
              <CardMedia
                onMouseOver={(e) => {
                  hoverEvent(i)
                }}
                onMouseLeave={(e) => {
                  hoverCancel(i)
                }}
                className={"tracking-in-contract-bck"}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                image={iterImage?.imgUrl?.indexOf("https://") === -1 ? "https://" + iterImage.imgUrl : iterImage.imgUrl}
                title={iterImage.name}
                onClick={() => {
                  imageClickEvent(i)
                }}
              >
                <div
                  ref={(el) => {
                    darkness.current[i] = el
                  }}
                  className="darkness"
                ></div>
                <div
                  ref={(el) => {
                    btn.current[i] = el
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
  )
}

export default GridContainer
