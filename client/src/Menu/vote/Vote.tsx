import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/core/styles";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
import { useMutation } from "@apollo/react-hooks";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { imageArr } from "./../VS/imageArr";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { IMovie } from "./../../interface/IMovie";
import gql from "./../../graphql/query";
import MoreIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const blackStar = require("./../../media/blackStar.png");

const useStyles = makeStyles((theme) => ({
  icon: {
    // marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(6),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
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
    flexGrow: 2,
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
    height: 156,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  carMapContainer: {
    // borderTop: "1px solid rgb(224,224,224)",
    // borderRight: "1px solid rgb(224,224,224)",
    // borderLeft: "1px solid rgb(224,224,224)",

    border: "1px solid rgb(224,224,224)",
    paddingTop: "15px", // 16:9
    marginBottom: "20px",
  },
  star: {
    // paddingRight: "30px",
    // width: "10px",
  },
  starImage: {
    width: "20px",
    // paddingLeft: "5px",
    // paddingRight: "0px",
    marginLeft: "12px",
  },
}));

type IVote = {
  callbackFunction: {
    searchMovie;
  };
};

export default function VoteComponent() {
  const classes = useStyles();

  const [movieList, setMovieList] = useState([]);

  const callbackFunction = {
    searchMovie: (selectList) => {
      setMovieList(selectList);
    },
  };

  const searchDetail = () => {};

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="xl">
            <Typography
              component="h5"
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              권태훈 님 , 인생영화를 검색 또는 태그해주세요
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              최종 선택 1개의 영화가 투표권수 1개 입니다.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid
                // style={{ width: "1800px" }}
                container
                spacing={10}
                justify="center"
              >
                <Grid item>
                  <CheckboxesTags callbackFunction={callbackFunction} />
                </Grid>
                {/* <Grid item>{CheckboxesTags(callbackFunction)}</Grid> */}
                <Grid item>
                  <div className={"count"}></div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          {movieList.map((iter: IMovie) => (
            <Grid className={classes.carMapContainer} container spacing={3}>
              <Grid item>
                <ButtonBase onClick={searchDetail} className={classes.image}>
                  <img
                    className={classes.img}
                    alt="noImage"
                    src={
                      iter?.imgUrl?.indexOf("https://") === -1
                        ? "https://" + iter.imgUrl
                        : iter.imgUrl
                    }
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} md container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {iter.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {iter.genre.map((v, idx) =>
                        idx === iter.genre.length - 1 ? v : v + " | "
                      )}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {iter.year}년 개봉
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    ></Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      득표수 : {iter.votes}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item className={classes.star}>
                  <Typography variant="subtitle2" style={{ cursor: "pointer" }}>
                    <img
                      className={classes.starImage}
                      alt="noImage"
                      src={blackStar}
                    />
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
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

let allMovieList: Array<IMovie> = [];
// export const CheckboxesTags: React.FunctionComponent<{
//   callbackFunction: Object;
// }> = ({ callbackFunction } = () => {
const CheckboxesTags: React.FunctionComponent<{
  callbackFunction: IVote["callbackFunction"];
}> = ({ callbackFunction }) => {
  const [getMovieAll, { called, loading, data }] = useLazyQuery(
    gql.GETMOVIEALL
  );
  const [movieList, setMovieList] = useState<IMovie[] | []>([]);
  let [selectList, setSelectList] = useState<Array<IMovie>>([]);

  // let autoCompleteRef = useRef<RefObject<any>>(null)
  let autoCompleteRef = React.useRef<any | null>(null);

  useEffect(() => {
    getMovieAll();
    if (data?.getMovieAll) {
      allMovieList = data?.getMovieAll;
    }
  }, [data]);

  return (
    <Autocomplete
      multiple
      ref={(e: RefObject<any>) => {
        autoCompleteRef.current = e;
      }}
      id="checkboxes-tags-demo"
      options={movieList}
      onClose={(e) => {}}
      onChange={(_, v) => {
        setSelectList(v);
      }}
      filterSelectedOptions
      // disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => {
        return <React.Fragment>{option.name}</React.Fragment>;
      }}
      style={{ width: 650, marginLeft: "50px" }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label="영화를 검색해주세요"
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                if (autoCompleteRef?.current?.ariaExpanded == "false") {
                  //검색 도움창이 닫혀있을때
                  callbackFunction.searchMovie(selectList);
                }
              }
            }}
            onChange={(e) => {
              if (e.target.value) {
                const filterData = allMovieList.filter((iter) => {
                  if (iter.name.indexOf(e.target.value) !== -1) {
                    return iter;
                  }
                });

                setMovieList(filterData);
              }
            }}
            // placeholder="해쉬태그"
          />
        );
      }}
    />
  );
};
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
  );
}
