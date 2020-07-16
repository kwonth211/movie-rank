import React, { useState } from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { Card, CardHeader, CardContent, CardActions, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, IconButton } from "@material-ui/core"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Icon from "@material-ui/core/Icon"
import { green, red } from "@material-ui/core/colors"
import { IMovie } from "../../../../../interface/IMovie"
import { useStyles } from "./style"
import { useStyles2 } from "./style2"
import mockData from "./data"

const SearchMovieList = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  let [movies, setMovies] = useState(props.totalImage)

  const removeMovie = (e, i) => {
    e.stopPropagation()

    movies = movies.filter((iter, index) => i !== index)
    setMovies(movies)
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {movies.map((movie, i) => (
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
                  removeMovie(e, i)
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

SearchMovieList.propTypes = {
  className: PropTypes.string,
  totalImage: PropTypes.array,
}

export default SearchMovieList
