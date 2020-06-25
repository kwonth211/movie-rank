import React, { useEffect, useContext, useState, RefObject } from "react"
import { useRecoilValue, useRecoilState } from "recoil"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, Badge, Button, IconButton } from "@material-ui/core"
import { IMovie } from "../../interface/IMovie"
import { AllMovieState } from "./../../atoms"
import { useStyles } from "./style"
import useReactRouter from "use-react-router"

export const Search: React.FunctionComponent<{}> = () => {
  const allMovieList = useRecoilValue<IMovie[]>(AllMovieState)

  const [movieList, setMovieList] = useState<IMovie[]>([])
  let [selectList, setSelectList] = useState<IMovie[]>([])
  const { history, location, match } = useReactRouter()

  const classes = useStyles()

  let autoCompleteRef = React.useRef<any | null>(null)

  return (
    <Autocomplete
      freeSolo
      className={classes.autoComplete}
      ref={(e: RefObject<any>) => {
        autoCompleteRef.current = e
      }}
      id="checkboxes-tags-demo"
      options={movieList}
      onClose={(e) => {}}
      onChange={(_, v) => {
        console.log(v)
        if (v) {
          history.replace({ pathname: "/movieDetail", search: "?query=" + encodeURI(v.name) })
        }
      }}
      filterSelectedOptions
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => {
        return <React.Fragment>{option.name}</React.Fragment>
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              className: classes.input,
              disableUnderline: true,
            }}
            className={classes.input}
            onChange={(e) => {
              if (e.target.value) {
                const filterData = allMovieList.filter((iter) => {
                  console.log(iter.name.replace(/\s/gi, ""))
                  if (iter.name.replace(/\s/gi, "").indexOf(e.target.value) !== -1) {
                    return iter
                  }
                })

                setMovieList(filterData)
              }
            }}
          />
          //   </Paper>
        )
      }}
    />
  )
}
