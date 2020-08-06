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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      "&:hover, &$focusVisible": {
        opacity: 1,
      },
      opacity: 0.7,
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      overflow: "hidden",
      marginTop: "40px",
      marginBottom: "20px",
      // backgroundColor: "gray",
      // width: "100%",
      height: "100%",
      // maxHeight: "600px",
    },
    gridList: {
      width: "40%",
      height: "100%",
      "&:hover": {},
    },
    titleBar: {
      background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " + "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
      color: "white",
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
  })
)

// let tileData = [
//   {
//     img: "",
//     title: "Image1",
//     author: "author",
//     featured: false,
//   },
//   {
//     img: "",
//     title: "Image2",
//     author: "author",
//     featured: false,
//   },
// ]
export const VsTournament: FunctionComponent<{ pickMovie: IMovie[] }> = ({ pickMovie }) => {
  // export const VsTournament() {
  const classes = useStyles()

  let items = React.useRef<HTMLLIElement | null[]>([])

  let [tileState, setTileState] = React.useState(fromJS([]))
  useEffect(() => {
    tileState = spliceImage()

    setTileState(tileState)
  }, [])

  const spliceImage = () => {
    for (let i = 0; i < 2; i++) {
      let randomInt = Math.floor(Math.random() * (pickMovie.length - 0 + 1)) + 0
      let spliceData = pickMovie.splice(randomInt - 1, 1)[0]
      // tileState = tileState.set(i, tileData[i])
      tileState = tileState.set(i, spliceData)
    }
    return tileState
  }

  return (
    <Grid container spacing={3}>
      {pickMovie.map((iterImage, i) => (
        <Grid item key={i} sm={2} md={2}>
          <Card style={{ height: "175px", width: "125px" }} className={classes.card}>
            <CardMedia
              onMouseOver={(e) => {
                // hoverEvent(i)
              }}
              onMouseLeave={(e) => {
                // hoverCancel(i)
              }}
              className={"tracking-in-contract-bck"}
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
              <div
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
              </div>
            </CardMedia>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
export default VsTournament
