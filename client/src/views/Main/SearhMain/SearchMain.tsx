import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject, useCallback, FunctionComponent } from "react"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import ButtonBase from "@material-ui/core/ButtonBase"
import { IMovie } from "../../../interface/IMovie"
import { IUser } from "../../../interface/IUser"
import MoreIcon from "@material-ui/icons/MoreVert"
import "./vote.css"
import Popover from "@material-ui/core/Popover"
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, Badge, Button, IconButton } from "@material-ui/core"
import useReactRouter from "use-react-router"
import { SearchBox } from "./components/SearchBox"
import Navigation from "./components/Navigation"
import { useStyles } from "./style"
import Box from "@material-ui/core/Box"
import Modal from "./../../../common/Modal"
import useModal from "./../../../common/useModal"
import { useRecoilValue, useRecoilState } from "recoil"
import { UserState } from "../../../atoms"
import gql from "./../../../graphql/query"
import { useMutation } from "@apollo/react-hooks"

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />

const checkedIcon = <CheckBoxIcon fontSize="small" />
const blackStar = require("./../../../media/blackStar.png")
const yellowStar = require("./../../../media/yellowStar.png")

export const SearchMain: FunctionComponent<{
  rankMovie: IMovie[] | []
  rankMovieCallback: Function
}> = ({ rankMovie }) => {
  const classes = useStyles()

  let [user, setUser] = useRecoilState<any>(UserState)

  const { history, location, match } = useReactRouter()

  const [searchMovie, setSearchMovie] = useState<IMovie[]>([])

  const [popupFlag, setPopupFlag] = useState(new Array(5).fill(false))

  const [starImage, setStarImage] = useState(new Array(5).fill(false))

  const { modalFlag, toggle, modalTitle } = useModal()

  const [updateFavorite, { data }] = useMutation(gql.UPDATEFAVORITEMOVIE)

  useEffect(() => {
    setSearchMovie(rankMovie) // rankMovie 중 즐겨찾기 체크해서 setState

    // setStarImage(starImage.map(() => yellowStar))
  }, [rankMovie])
  useEffect(() => {
    let defaultArray = searchMovie.map(() => false)
    setPopupFlag(defaultArray)
    if (user) {
      // let a = ["127 시간", "2012: 타임 포 체인지"]
      defaultArray = searchMovie.map((iter) => {
        for (let i = 0; i < user.favoriteMovie.length; i++) {
          if (iter.name === user.favoriteMovie[i]) {
            return true
          }
        }
        return false
      })
    }
    setStarImage(defaultArray)
  }, [searchMovie, user])

  // useEffect(() => {
  //   console.log(data)
  //   debugger
  // }, [data])

  const setSearchMovieCallback = useCallback(
    (param) => {
      if (param.length > 0) {
        return setSearchMovie(param)
      } else {
        return setSearchMovie(rankMovie.slice(0, 5))
      }
    },
    [searchMovie]
  )

  const searchDetail = () => {}
  const movieDetail = (e) => {
    if ((e.target.className && e.target.tagName === "DIV") || (e.target.tagName === "IMG" && e.target.className.indexOf("img") !== -1)) {
      history.push({
        pathname: "/movieDetail",
        search: "?query=" + encodeURI(e.currentTarget.innerText.split("\n")[0]),
      })
    }
  }
  const handleClose = (e) => {
    e.stopPropagation()
    let tempArr = popupFlag.map(() => false)
    setPopupFlag(tempArr)
  }

  const voteClick = (e) => {
    handleClose(e)
    toggle("투표 하시겠습니까?", {
      callback: () => {
        console.log("확인눌렀다!!!!!!!!!!!!!!")
      },
    })
  }

  const starIconClick = (e, i) => {
    if (Object.keys(user).length > 0) {
      if (starImage[i]) {
        // 즐겨찾기 취소
        toggle("즐겨찾기를 취소하시겠습니까?", {
          callback: () => {
            setStarImage(starImage.map((img, index) => (index === i ? false : img)))

            const favoriteArr = user.favoriteMovie.filter((iter) => iter !== searchMovie[i].name)

            updateFavorite({ variables: { movies: favoriteArr, no: user.no } })

            let tempUser = { ...user, favoriteMovie: favoriteArr }
            setUser(tempUser)
          },
        })
      } else {
        toggle("즐겨찾기 하시겠습니까?", {
          callback: () => {
            setStarImage(starImage.map((img, index) => (index === i ? true : img)))

            const favoriteArr = user.favoriteMovie.concat(searchMovie[i].name)
            updateFavorite({ variables: { movies: favoriteArr, no: user.no } })

            let tempUser = { ...user, favoriteMovie: favoriteArr }
            debugger
            setUser(tempUser)
          },
        })
      }
    } else {
      alert("로그인 후 이용해주시기 바랍니다.")
    }
  }
  const test = (e, i) => {
    // if (e.target.tagName === "svg" || e.target.tagName === "BUTTON") {
    // }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <div>
          <Navigation></Navigation>
        </div>

        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <div style={{ marginLeft: "170px" }}>
              <Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                인생영화를 검색 또는 태그해주세요
              </Typography>
            </div>
            <div className={classes.heroButtons}>
              <Grid container spacing={8} justify="flex-start">
                <Grid item>
                  <SearchBox callback={setSearchMovieCallback} />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid}>
          {searchMovie.map((iter: IMovie, i) => (
            <Grid key={i} onClick={movieDetail} className={classes.carMapContainer} container spacing={3}>
              <Grid item>
                <ButtonBase onClick={searchDetail} className={classes.image}>
                  <img className={classes.img} alt="noImage" src={iter?.imgUrl?.indexOf("https://") === -1 ? "https://" + iter.imgUrl : iter.imgUrl} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} md container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {iter.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {iter.genre.map((v, idx) => (idx === iter.genre.length - 1 ? v : v + " | "))}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {iter.year}년 개봉
                    </Typography>
                    <Typography variant="body2" color="textSecondary"></Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      득표수 : {iter.votes}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className={classes.star}>
                  <IconButton
                    onClick={(e) => {
                      starIconClick(e, i)
                    }}
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Typography variant="subtitle2" style={{ cursor: "pointer" }}>
                      <img className={classes.starImage} alt="noImage" src={starImage[i] === false ? blackStar : yellowStar} />
                    </Typography>
                  </IconButton>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Typography
                    onClick={(e) => {
                      let tempArr = popupFlag.map((iter, arrayIndex) => (i === arrayIndex ? true : false))
                      console.log(tempArr)
                      setPopupFlag(tempArr)
                    }}
                    variant="subtitle2"
                    style={{ cursor: "pointer" }}
                  >
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <div>
                          <IconButton
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                            {...bindTrigger(popupState)}

                            // onClick={handleProfileMenuOpen}
                          >
                            <MoreIcon />
                          </IconButton>
                          <Popover
                            // onRequestClose={this.handleRequestClose}
                            {...bindPopover(popupState)}
                            open={popupFlag[i]}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "center",
                              horizontal: "left",
                            }}
                          >
                            <Box p={1}>
                              <Button>상세보기</Button>
                            </Box>
                            <Box onClick={voteClick} p={1}>
                              <Button>투표하기</Button>
                            </Box>
                          </Popover>
                        </div>
                      )}
                    </PopupState>
                    {/* </ButtonBase> */}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Container>

        <Modal modalFlag={modalFlag} toggle={toggle} title={modalTitle} />
      </main>
    </React.Fragment>
  )
}

export default SearchMain
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
