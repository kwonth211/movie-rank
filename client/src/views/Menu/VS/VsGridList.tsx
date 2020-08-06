import React, { useEffect, useState, useRef, useCallback } from "react"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import gql from "../../../graphql/query"
import { useLazyQuery } from "@apollo/react-hooks"
import ProgressModelComponent from "../../../common/ProgressModelComponent"
import { IMovie } from "../../../interface/IMovie"
import { useStyles } from "./style"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import MymovieDialog from "./components/MymovieDialog"
import useScroll from "../../../common/scroll/Scroll"
import { useRecoilValue } from "recoil"
import { UserState } from "../../../atoms"
import { IUser } from "./../../../interface/IUser"
import { AllMovieAtom } from "../../../atoms"
import MovieDetail from "../MovieDetail/movieDetail"
import { VsTournament } from "./VsTournament"
import ModalComponent from "../../../common/Modal"
import useModal from "./../../../common/useModal"
import Modal from "./../../../common/Modal"

const VsGridList: React.FunctionComponent<{ genre: String }> = ({ genre, children }) => {
  const classes = useStyles()
  const [totalImage, setTotalImage] = useState<IMovie[]>([]) // 총 랜덤리스트 에서  0으로 수렴
  const [fixtotalImage, setFixtotalImage] = useState<IMovie[]>([]) //고정적 랜덤리스트
  let [searchMovieList, setSearchMovieList] = useState<IMovie[]>([]) //검색 리스트
  const [imageArr, setImageArr] = useState<IMovie[]>([]) //보여지는 영화리스트
  const user = useRecoilValue<IUser | null>(UserState)
  const allMovieList = useRecoilValue<IMovie[]>(AllMovieAtom)

  const [getMovieGenre, { called, loading, data }] = useLazyQuery(gql.GETMOVIEGENRE)
  const [modalFlag, setModalFlag] = useState(false)
  let darkness = useRef<HTMLDivElement | null[]>([])
  let btn = useRef<HTMLDivElement | null[]>([])
  let [pickMovie, setPickMovie] = useState<IMovie[]>([])
  const { percentage } = useScroll()
  const { modalFlag: commonModal, toggle, modalTitle } = useModal()
  let [tournamentFlag, setTournamentFlag] = useState(false)

  const pickCount = pickMovie.length

  /* Todo 
  
  장르 속도개선 해야함..*/
  useEffect(() => {
    getMovieGenre({ variables: { genre } })
    let imageList = data?.getMovieGenre
    // 60개의 배열을 미리 담는다 / 동시에 전체 영화리스트에서 제외시킨다
    if (imageList) {
      imageList = imageList.filter((iter) => {
        if (iter.imgUrl) {
          return iter
        }
      })
      // searchMovieList = imageList

      let totalImageTemp = []
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
          const randomInt = Math.floor(Math.random() * (imageList.length - 0 + 1)) + 0
          let spliceData = imageList.splice(randomInt - 1, 1)[0]
          if (spliceData && Object.keys(spliceData).length > 0) {
            totalImageTemp = totalImageTemp.concat(spliceData)
          }
        }
      }
      setSearchMovieList([...imageList])
      setTotalImage([...totalImageTemp])
      setFixtotalImage([...totalImageTemp])
    }
  }, [data])

  useEffect(() => {
    setImageArr(totalImage.splice(0, 18))
  }, [totalImage])

  useEffect(() => {
    if (percentage >= 80) {
      setImageArr([...imageArr, ...totalImage.splice(0, 6)])
    }
  }, [percentage])

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
      setTotalImage([...movies])
      setFixtotalImage([...movies])
    } else {
    }
    setModalFlag(!modalFlag)
  }

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
      if (pickCount === 3) {
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
    setPickMovie(pickMovie)
  }
  const tournamentStart = () => {
    toggle("토너먼트를 시작하시겠습니까?", {
      callback: () => {
        setTournamentFlag(true)
      },
    })
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

  if (called && loading) return <ProgressModelComponent />

  if (tournamentFlag) {
    return <VsTournament pickMovie={pickMovie} />
  } else {
    return (
      <React.Fragment>
        <Modal modalFlag={commonModal} toggle={toggle} title={modalTitle} />

        <CssBaseline />

        <main id={"top"}>
          {/* Hero unit */}
          <MymovieDialog open={modalFlag} callback={modalCallback} searchList={searchMovieList} totalImage={fixtotalImage} />

          <Fab className={classes.addButton} color="primary" aria-label="add" onClick={modalCallback}>
            <AddIcon />
          </Fab>

          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                {user?.name} 님 , 좋아하는 영화 총 16개를 PICK 해주세요
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                최종 선택 1개의 영화가 투표권수 1개 입니다.
              </Typography>

              <Typography style={{ marginBottom: "-10px" }} variant="h6" align="center" color="textSecondary" paragraph>
                {pickCount}/16
                {/* <div style={{ display: "inline", marginLeft: "15px" }}>
                  <Button variant="contained" color="primary">
                    시작하기
                  </Button>
                </div> */}
              </Typography>
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
        </main>
        {/* Footer */}
        <footer className={classes.footer}></footer>
        {/* End footer */}
      </React.Fragment>
    )
  }
}

export default VsGridList
