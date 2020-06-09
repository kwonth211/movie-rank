import React, { useEffect, useState, useRef } from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import { imageArr } from "./imageArr"
import "./../../App.css"
import { gql } from "apollo-boost"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { fromJS, List, Map } from "immutable"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
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
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const cards = imageArr

interface Movies {
  imgUrl: string
  cast: [string]
  runtime: string
  released: [string]
  directors: [string]
  writers: [string]
  year: string
  countries: [string]
  languages: [string]
  profit: string
  name: string
  votes: Number
  hashTag: [string]
  genre: [string]
}

const GETMOVIEGENRE = gql`
  query getMovieGenre($genre: String!) {
    getMovieGenre(genre: $genre) {
      imgUrl
      name
      runtime
      released
      directors
      writers
      # // awards :   ??
      year
      countries
      languages
      # // ProductionCost: String
      profit
      votes
      hashTag
      genre
    }
  }
`
const totalImage: Movies[][] = [[], [], [], []]
const totalPickCount: number[][] = [[], [], [], []]
const VsGridList: React.FunctionComponent<{ genre: String }> = ({ genre }) => {
  const classes = useStyles()
  const [getMovieGenre, { called, loading, data }] = useLazyQuery(GETMOVIEGENRE)
  const [imageArr, setImageArr] = useState<Movies[]>([])
  let [pageCount, setPageCount] = useState(0)

  let darkness = useRef<HTMLDivElement | null[]>([])
  let btn = useRef<HTMLDivElement | null[]>([])

  let [pickCount, setPickCount] = useState(0)

  useEffect(() => {
    getMovieGenre({ variables: { genre } })
    let imageList = data?.getMovieGenre

    // 이차원 배열로 16개씩 4개 담는다. 64개..
    if (imageList) {
      imageList = imageList.filter((iter) => {
        if (iter.imgUrl) {
          return iter
        }
      })

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 12; j++) {
          const randomInt = Math.floor(Math.random() * (imageList.length - 0 + 1)) + 0
          let spliceData = imageList.splice(randomInt - 1, 1)[0]
          if (spliceData && Object.keys(spliceData).length > 0) {
            totalImage[i][j] = spliceData
          }
        }
      }
      // 처음엔 totalImage 중 0번째 .. 그이후에는 [1] [2][3] 식으로..
      setImageArr(totalImage[pageCount])
    }
  }, [data])

  useEffect(() => {})

  const imageClickEvent = (i) => {
    if (darkness.current[i].style.opacity == 0.6) {
      darkness.current[i].style.opacity = 0
      btn.current[i].style.opacity = 0
      btn.current[i].style.transform = ""
      const findIndex = totalPickCount[pageCount].findIndex((index) => i)
      totalPickCount[pageCount].splice(findIndex, 1)
    } else {
      darkness.current[i].style.opacity = 0.6
      btn.current[i].style.opacity = 1
      btn.current[i].style.transform = "scale(1)"
      totalPickCount[pageCount].push(i)
    }

    let tempCount = 0
    for (let i = 0; i < 4; i++) {
      tempCount += totalPickCount[i].length
    }

    setPickCount(tempCount)
  }

  if (called && loading) return <p>Loading ...</p>

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
              kwonth211 님 , 좋아하는 영화 총 16개를 PICK 해주세요
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              최종 선택 1개의 영화가 투표권수 1개 입니다.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      if (pageCount > 0) {
                        setPageCount(pageCount - 1)
                        setImageArr(totalImage[--pageCount])
                        for (let i = 0; i < 12; i++) {
                          const findIndex = totalPickCount[pageCount].findIndex((iter) => {
                            return iter === i
                          })

                          if (darkness.current[i]) {
                            if (findIndex !== -1) {
                              darkness.current[i].style.opacity = 0.6
                              btn.current[i].style.opacity = 1
                              btn.current[i].style.transform = "scale(1)"
                            } else {
                              darkness.current[i].style.opacity = 0
                              btn.current[i].style.opacity = 0
                              btn.current[i].style.transform = ""
                            }
                          }
                        }
                      }
                    }}
                  >
                    이전
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      if (pageCount < 3) {
                        setPageCount(pageCount + 1)
                        setImageArr(totalImage[++pageCount])
                        for (let i = 0; i < 12; i++) {
                          const findIndex = totalPickCount[pageCount].findIndex((iter) => {
                            return iter === i
                          })
                          if (darkness.current[i]) {
                            if (findIndex !== -1) {
                              darkness.current[i].style.opacity = 0.6
                              btn.current[i].style.opacity = 1
                              btn.current[i].style.transform = "scale(1)"
                            } else {
                              darkness.current[i].style.opacity = 0
                              btn.current[i].style.opacity = 0
                              btn.current[i].style.transform = ""
                            }
                          }
                        }
                      }
                    }}
                    variant="contained"
                    color="primary"
                  >
                    다음
                  </Button>
                </Grid>
                <Grid item>
                  <div className={"count"}>
                    <span draggable="false">{pickCount}/16</span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {imageArr.map((iterImage, i) => (
              <Grid item key={i} sm={2} md={2}>
                <Card style={{ height: "175px", width: "125px" }} className={classes.card}>
                  <CardMedia
                    className={"tracking-in-contract-bck"}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    image={"https://" + iterImage.imgUrl}
                    title={iterImage.name}
                    onClick={() => {
                      if (pickCount <= 15) imageClickEvent(i)

                      // console.log(totalPickCount)
                      // debugger
                    }}
                  >
                    <div
                      ref={(el) => {
                        darkness.current[i] = el
                      }}
                      // style={{ opacity: true ? 0.7 : 0.2 }}
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
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

export default VsGridList
