import React, { useEffect } from "react";
import VsModalComponent from "../../components/vsModalComponent";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);

  const [vsStart, setVsStart] = React.useState(false);
  useEffect(() => {
    // setOpen(true);
  }, []);

  const callbackFunction = {
    vsStart: (type) => {
      setVsStart(true);
    },
  };

  return (
    <div>
      {vsStart ? (
        <div>
          <AdvancedGridList />
        </div>
      ) : (
        ""
      )}
      <VsModalComponent {...callbackFunction}></VsModalComponent>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      "&:hover, &$focusVisible": {
        // zIndex: 1,
        opacity: 1,
        // -webkit-transform: translateX(100px) translate(100px),
        // -moz-transform: translateX(100px) translate(100px),
        // -ms-transform: translateX(100px) translate(100px),
        // -o-transform: translateX(100px) translate(100px),
      },
      opacity: 0.55,
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      marginTop: "40px",
      backgroundColor: "gray",
      width: "100%",
      // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "40%",
      height: "100%",
      "&:hover": {
        bacgroundColor: "red",
      },
      // p: "100px",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateX(100)",
      // transform: "skew('45deg')",
    },
    titleBar: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    icon: {
      color: "white",
    },
  })
);

const tileData = [
  {
    img:
      "https://lh3.googleusercontent.com/proxy/k3EvRqCEBdAnbzh4e87lIwhenHiWhmkJ8IZZ1gCRfHatouudJ30isPdKq1cvITl3sJTTYos46oRs6r8zldGU449Qn0lAVWttaxFkzxyfCqE0xhIVZR5Tsv-lCkW6TCNHbE3MD4nJoWKaYqKJLTNY0vhM8PHH6VMvGTuJkscncfrQJ8QxG_7kwm5nmu_RLhHc4FnTHtPaCIw-nGmosp7STYIuKP4GEOmQSTS48AMAiR5F34Cvuv3bWeVDoiMzhksnwJ3PSDGU2mY3HAdJOEqfovYA40oAeP0UXuMekixFELZosbdBkD9TiI6rkrPCXIa03RmgBA",
    title: "Image",
    author: "author",
    featured: false,
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/ko/thumb/5/5d/%EB%82%98%EB%A5%BC_%EC%B0%BE%EC%95%84%EC%A4%98.jpg/220px-%EB%82%98%EB%A5%BC_%EC%B0%BE%EC%95%84%EC%A4%98.jpg",
    title: "Image",
    author: "author",
    featured: false,
  },
];

function AdvancedGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={700} spacing={10} className={classes.gridList}>
        {tileData.map((tile, i) => (
          <GridListTile
            key={tile.img}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
            style={{
              background: "red",
            }}
          >
            <img
              src={tile.img}
              style={{ height: "100%", width: "100%" }}
              alt={tile.title}
              className={classes.image}
            />
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.title}`}
                  className={classes.icon}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
