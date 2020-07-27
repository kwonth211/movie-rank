import React, { useState, RefObject } from "react"
import { useRecoilValue } from "recoil"
import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import { IMovie } from "../../interface/IMovie"
import { AllMovieAtom } from "./../../atoms"
import { useStyles } from "./style"
import useReactRouter from "use-react-router"

export const Search: React.FunctionComponent<{}> = () => {
  const allMovieList = useRecoilValue<IMovie[]>(AllMovieAtom)
  const [movieList, setMovieList] = useState<IMovie[]>([])
  const { history } = useReactRouter()
  const classes = useStyles()
  const [textField, setTextField] = useState("")
  let autoCompleteRef = React.useRef<any | null>(null)
  let textRef = React.useRef<any | null>(null)

  const clearInput = () => {
    setTextField("")
    textRef.current.blur()
  }

  return (
    <Autocomplete
      freeSolo
      className={classes.autoComplete}
      inputValue={textField}
      ref={(e: RefObject<any>) => {
        autoCompleteRef.current = e
      }}
      id="checkboxes-tags-demo"
      options={movieList}
      onClose={(e) => {}}
      onChange={(_, v) => {
        if (v) {
          clearInput()
          let query = ""
          if (typeof v == "object") {
            query = encodeURI(v.name)
          } else {
            query = encodeURI(movieList[0] ? movieList[0].name : "")
          }
          history.replace({ pathname: "/movieDetail", search: "?query=" + query })
        }
      }}
      filterSelectedOptions
      getOptionLabel={(option) => {
        if (typeof option == "object") {
          return option.name.replace(/\s/gi, "")
        } else {
          return movieList[0] ? movieList[0].name : ""
        }
      }}
      renderOption={(option, { selected }) => {
        return <React.Fragment>{option.name}</React.Fragment>
      }}
      renderInput={(params) => {
        return (
          <TextField
            inputRef={(e) => {
              textRef.current = e
            }}
            {...params}
            InputProps={{
              ...params.InputProps,
              className: classes.input,
              disableUnderline: true,
            }}
            className={classes.input}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                clearInput()
              }
            }}
            onChange={(e) => {
              setTextField(e.target.value)
              if (e.target.value) {
                const filterData = allMovieList.filter((iter) => {
                  if (iter.name.indexOf(e.target.value.trim()) !== -1 || iter.name.replace(/\s/gi, "").indexOf(e.target.value.trim()) !== -1) {
                    return iter
                  }
                })

                setMovieList(filterData)
              }
            }}
          />
        )
      }}
    />
  )
}
