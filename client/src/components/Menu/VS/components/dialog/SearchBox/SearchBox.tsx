import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState, useEffect, useContext, useRef, MutableRefObject, RefObject, useCallback } from "react"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import { IMovie } from "../../../../../../interface/IMovie"
import MoreIcon from "@material-ui/icons/MoreVert"
import { IconButton } from "@material-ui/core"
// import "./vote.css"
import { AllMovieAtom } from "../../../../../../atoms"
import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import useReactRouter from "use-react-router"

import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import SearchIcon from "@material-ui/icons/Search"
import { useStyles } from "./style"
import { UseAutocompleteProps } from "@material-ui/lab/useAutocomplete"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
interface ISearchProps {
  callback: Function
  styleFlag?: string
  text: string
  movies?: IMovie[] | []
  searchList: IMovie[]
}

export const SearchBox: React.FunctionComponent<ISearchProps> = ({ callback, styleFlag, text, movies, searchList }) => {
  const [hashTagList, setHashTagList] = useState<IMovie[]>([])

  let [selectList, setSelectList] = useState<IMovie[] | []>([])

  const [textField, setTextField] = useState("")
  const classes = useStyles()

  let autoCompleteRef = React.useRef<any | null>(null)

  console.log(searchList)
  useEffect(() => {
    if (movies) {
    }
  }, [])

  // dialog freesolo
  return (
    <Autocomplete
      ref={(e: RefObject<any>) => {
        autoCompleteRef.current = e
      }}
      id="checkboxes-tags-demo"
      options={hashTagList}
      onClose={(e) => {}}
      onChange={(e, v) => {
        if (v) {
          callback(v)
          setTextField(v.name)

          // setHashTagList([])
          setTimeout(() => {
            setTextField("")
          }, 150)
        }
        // debugger
      }}
      filterSelectedOptions
      filterOptions={(r) => {
        return r
      }}
      getOptionLabel={(option) => {
        return option.name.replace(/\s/gi, "")
      }}
      renderOption={(option, { selected }) => {
        return <React.Fragment>{option.name}</React.Fragment>
      }}
      renderInput={(params) => {
        return (
          <Paper className={classes.root2}>
            <TextField
              {...params}
              inputProps={{ ...params.inputProps, value: textField }}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              style={{ textDecoration: "none" }}
              className={classes.input}
              placeholder={autoCompleteRef?.current?.innerText ? "" : text}
              onKeyDown={(e) => {
                // if (e.keyCode == 13) {
                //   if (autoCompleteRef?.current?.ariaExpanded == "false") {
                //     //검색 도움창이 닫혀있을때
                //   } else {
                //     console.log(">>>>>>", hashTagList[0])
                //     setSelectList([hashTagList[0]])
                //   }
                // }
              }}
              onChange={(e) => {
                setTextField(e.target.value)
                if (e.target.value) {
                  const filterData = searchList.filter((iter) => {
                    if (iter.name.indexOf(e.target.value.replace(/\s/gi, "")) !== -1 || iter.name.replace(/\s/gi, "").indexOf(e.target.value) !== -1 || iter.name.indexOf(e.target.value) !== -1 || iter.name.replace(/\s/gi, "").indexOf(e.target.value.replace(/\s/gi, "")) !== -1) {
                      return iter
                    }
                  })
                  console.log(":::::", filterData)
                  console.log(movies)

                  setHashTagList([...filterData])
                } else {
                  setHashTagList([])
                }
              }}
            />
          </Paper>
        )
      }}
    />
  )
}
