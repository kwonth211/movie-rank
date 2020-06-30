import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject, useCallback, FunctionComponent } from "react"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import { IMovie } from "../../../interface/IMovie"
import MoreIcon from "@material-ui/icons/MoreVert"
import { IconButton } from "@material-ui/core"
import "./vote.css"
import useReactRouter from "use-react-router"
import { SearchBox } from "./components/SearchBox"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import SearchIcon from "@material-ui/icons/Search"
import { useStyles } from "./style"
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const blackStar = require("./../../../media/blackStar.png")

export const SearchMain: FunctionComponent<{ rankMovie: IMovie[] | []; rankMovieCallback: Function }> = ({ rankMovie }) => {
  const classes = useStyles()

  const { history, location, match } = useReactRouter()

  const [searchMovie, setSearchMovie] = useState<IMovie[]>([])

  useEffect(() => {
    // setSearchMovie(rankMovie.slice(0, 5))
    setSearchMovie(rankMovie)
  }, [rankMovie])

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
    const tagName = e.target.tagName
    if (tagName !== "IMG") {
      if (tagName === "svg") {
        // popup? 나옴
      } else {
        //페이지 이동

        history.push({ pathname: "/movieDetail", search: "?query=" + encodeURI(e.currentTarget.innerText.split("\n")[0]) })
      }
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <div style={{ marginLeft: "130px" }}>
              <Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                권태훈 님 , 인생영화를 검색 또는 태그해주세요
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
        {/* <Container className={classes.cardGrid}  maxWidth="sm"> */}
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
                  <Typography variant="subtitle2" style={{ cursor: "pointer" }}>
                    <img className={classes.starImage} alt="noImage" src={blackStar} />
                  </Typography>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Typography variant="subtitle2" style={{ cursor: "pointer" }}>
                    <IconButton
                      aria-label="show more"
                      // aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      // onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                    {/* </ButtonBase> */}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Container>
      </main>
      {/* Footer */}
      {/* <footer className={classes.footer}>
        <Copyright />
      </footer> */}
      {/* End footer */}
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