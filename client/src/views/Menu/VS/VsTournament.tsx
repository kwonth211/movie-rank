import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import IconButton from "@material-ui/core/IconButton"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import { fromJS, List, Map } from "immutable"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import React, { useEffect, KeyboardEvent, FunctionComponent } from "react"
// import { imageArr } from "./imageArr"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import { IMovie } from "../../../interface/IMovie"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      "&:hover, &$focusVisible": {
        opacity: 1,
      },
      opacity: 0.7,
    },
    root: {
      // backgroundColor: theme.palette.background.paper,

      position: "absolute",
      bottom: 0,
      marginBottom: "20px",
    },
    gridList: {
      width: "40%",
      height: "100%",
      "&:hover": {},
    },

    cardContent: {
      // flexGrow: 1,
    },
    // footer: {
    //   backgroundColor: theme.palette.background.paper,
    //   padding: theme.spacing(6),
    // },
    addButton: {
      // position: "fixed",
      // top: "60%",
    },
    verticalLine: {
      height: "50px",
      width: "0px",
      borderRight: "0px",
      // marginTop: "15px",
    },
    horizontaLine: {
      alignItems: "left",
      marginLeft: "60px",
      paddingLeft: "60px",
    },
    noneLine: {
      alignItems: "right",
      marginRight: "80px",
      paddingRight: "80px",
    },
  })
)

export const VsTournament: FunctionComponent<{ pickMovie: IMovie[] }> = ({ pickMovie }) => {
  // export const VsTournament() {
  const classes = useStyles()

  let items = React.useRef<HTMLLIElement | null[]>([])

  let [tileState, setTileState] = React.useState(fromJS([]))
  useEffect(() => {
    // tileState = spliceImage()

    setTileState(pickMovie)
  }, [])

  const spliceImage = () => {
    // for (let i = 0; i < 2; i++) {
    //   let randomInt = Math.floor(Math.random() * (pickMovie.length - 0 + 1)) + 0
    //   let spliceData = pickMovie.splice(randomInt - 1, 1)[0]
    //   // tileState = tileState.set(i, tileData[i])
    //   tileState = tileState.set(i, spliceData)
    // }
    // return tileState
  }

  return (
    <React.Fragment>
      <CssBaseline />

      {/* Hero unit */}

      <Container maxWidth="xl">
        <Grid className={classes.root} container spacing={2}>
          {pickMovie.map((iterImage, i) => (
            <div style={{ display: "inline" }}>
              {i % 2 === 0 ? <hr className={classes.horizontaLine} /> : <hr className={classes.noneLine} />}

              <hr className={classes.verticalLine} />

              <Grid item key={i} sm={1} md={1}>
                <Card style={{ height: "155px", width: "115px" }}>
                  <CardMedia
                    onMouseOver={(e) => {
                      // hoverEvent(i)
                    }}
                    onMouseLeave={(e) => {
                      // hoverCancel(i)
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    image={iterImage?.imgUrl?.indexOf("https://") === -1 ? "https://" + iterImage.imgUrl : iterImage.imgUrl}
                    title={iterImage.name}
                    onClick={() => {
                      // imageClickEvent(i)
                    }}
                  >
                    {/* <div
                      ref={(el) => {
                        // darkness.current[i] = el
                      }}
                      className="darkness"
                    ></div>
                    <div
                      ref={(el) => {
                        // btn.current[i] = el
                      }}
                      className="btn-plus"
                    >
                      <span draggable="false">♡</span>
                    </div> */}
                  </CardMedia>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
export default VsTournament
