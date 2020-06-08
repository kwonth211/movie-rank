import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { imageArr } from "./imageArr";
import "./../../App.css";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
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
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const cards = imageArr;

interface Movies {
  imgUrl: string;
  cast: [string];
  runtime: string;
  released: [string];
  directors: [string];
  writers: [string];
  year: string;
  countries: [string];
  languages: [string];
  profit: string;
  name: string;
  votes: Number;
  hashTag: [string];
  genre: [string];
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
`;
const VsGridList: React.FunctionComponent<{ genre: String }> = ({ genre }) => {
  const classes = useStyles();
  const [getMovieGenre, { called, loading, data }] = useLazyQuery(
    GETMOVIEGENRE
  );
  const [imageArr, setImageArr] = useState<Movies[]>([]);

  const totalImage = [[], [], [], []];
  useEffect(() => {
    getMovieGenre({ variables: { genre } });
    let imageList = data?.getMovieGenre;

    // 이차원 배열로 16개씩 4개 담는다. 64개..
    if (imageList) {
      imageList = imageList.filter((iter) => {
        if (iter.imgUrl) {
          return iter;
        }
      });
      // 처음엔 totalImage 중 0번째 .. 그이후에는 [1] [2][3] 식으로..
      setImageArr(imageList);
    }
  }, [data]);

  useEffect(() => {});

  if (called && loading) return <p>Loading ...</p>;

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h5"
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              kwonth211 님 , 좋아하는 영화 총 16개를 PICK 해주세요
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              총 1개의 영화가 투표권수 1개 입니다.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    이전
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    다음
                  </Button>
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
                    image={"https://" + iterImage.imgUrl}
                    title={iterImage.name}
                  >
                    <div className="darkness"></div>
                    <div className="btn-plus">
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
  );
};

export default VsGridList;
