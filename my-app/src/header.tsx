import React, { useState } from "react"
import { Button, AppBar, IconButton, Toolbar, Typography } from "@material-ui/core/"
import { Route, Link } from "react-router-dom"
// import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme, fade } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 2,
      color: "blue",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)
function Header() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"></IconButton>
          <Typography variant="h6" className={classes.title}>
            Main
          </Typography>
          {/* <Link to="/login"> */}
          <Button color="inherit" onClick={() => console.log("11")}>
            Login
          </Button>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Header
