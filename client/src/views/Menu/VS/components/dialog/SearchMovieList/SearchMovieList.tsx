import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { Card, CardContent, CardActions, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, IconButton } from "@material-ui/core"
import Icon from "@material-ui/core/Icon"
import { useStyles } from "./style"

const MovieList = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  console.log(props.movies)

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {props.movies.map((movie, i) => (
            <ListItem divider={i < movie.length - 1} key={movie.id}>
              <ListItemAvatar>
                <img className={classes.image} src={movie.imgUrl} />
              </ListItemAvatar>
              <ListItemText primary={movie.name} secondary={movie.year} />
              {/* <IconButton edge="end" size="small">
                <div className={classes.icon}>
                  <Icon style={{ color: green[500] }}>update_circle</Icon>
                </div>
              </IconButton> */}
              <IconButton
                edge="end"
                size="small"
                onClick={(e) => {
                  props.removeMovie(e, i)
                }}
              >
                {/* <div className={classes.icon}> */}
                <Icon style={{ color: "red" }}>remove_circle</Icon>
                {/* </div> */}
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
    </Card>
  )
}

MovieList.propTypes = {
  className: PropTypes.string,
  movies: PropTypes.array,
  removeMovie: PropTypes.func,
}

export default MovieList
