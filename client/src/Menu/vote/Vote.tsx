import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject } from "react"
import { useMutation } from "@apollo/react-hooks"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Button from "@material-ui/core/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import { imageArr } from "./../VS/imageArr"
import { useQuery, useLazyQuery } from "@apollo/react-hooks"
import { IMovie } from "./../../interface/IMovie"
import gql from "./../../graphql/query"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

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

  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}))

export default function VoteComponent() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
              권태훈 님 , 인생영화를 검색 또는 태그해주세요
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              최종 선택 1개의 영화가 투표권수 1개 입니다.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>{CheckboxesTags()}</Grid>
                <Grid item>
                  <div className={"count"}></div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          {imageArr.map((iter) => (
            <Grid container spacing={3}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={iter} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Standard license
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Full resolution 1920x1080 • JPEG
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ID: 1030114
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      Remove
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">$19.00</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
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

let allMovieList: Array<IMovie> = []

export function CheckboxesTags() {
  const [getMovieAll, { called, loading, data }] = useLazyQuery(gql.GETMOVIEALL)
  const [movieList, setMovieList] = useState<IMovie[] | []>([])

  // let autoCompleteRef = useRef<RefObject<any>>(null)
  let autoCompleteRef = React.useRef<any | null>(null)

  useEffect(() => {
    getMovieAll()
    if (data?.getMovieAll) {
      allMovieList = data?.getMovieAll
    }
  }, [data])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {}
  return (
    <Autocomplete
      multiple
      ref={(e: RefObject<any>) => {
        autoCompleteRef.current = e
      }}
      id="checkboxes-tags-demo"
      options={movieList}
      onClose={(e) => {}}
      onChange={(_, v) => {
        console.log(v)
      }}
      // onChange={handleChange}
      filterSelectedOptions
      // disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => {
        console.log(selected)
        console.log(option)
        return (
          <React.Fragment>
            {/* <Checkbox
              icon={icon}
              onChange={(e) => {
                // console.log(e)
                // debugger
              }}
              onClick={(e) => {
                // debugger
              }}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            /> */}
            {option.name}
          </React.Fragment>
        )
      }}
      style={{ width: 500 }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label="영화를 검색해주세요"
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                console.log(params)
                console.log(movieList)
                //   setMovieList([])
              }
            }}
            onChange={(e) => {
              if (e.target.value) {
                const filterData = allMovieList.filter((iter) => {
                  if (iter.name.indexOf(e.target.value) !== -1) {
                    return iter
                  }
                })

                setMovieList(filterData)
              }
            }}
            placeholder="Favorites"
          />
        )
      }}
    />
  )
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

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
