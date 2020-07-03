import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
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
import { IMovie } from "../../../../interface/IMovie"
import MoreIcon from "@material-ui/icons/MoreVert"
import { IconButton } from "@material-ui/core"
// import "./vote.css"
import { AllMovieState } from "../../../../atoms"
import { useRecoilValue } from "recoil"
import useReactRouter from "use-react-router"

import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import SearchIcon from "@material-ui/icons/Search"
import { useStyles } from "../style"
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const SearchBox: React.FunctionComponent<{
  callback: Function
}> = ({ callback }) => {
  const allMovieList = useRecoilValue<IMovie[]>(AllMovieState)

  const [hashTagList, setHashTagList] = useState<IMovie[]>([])

  let [selectList, setSelectList] = useState<IMovie[]>([]) //

  const [textField, setTextField] = useState("")
  const classes = useStyles()

  let autoCompleteRef = React.useRef<any | null>(null)

  return (
    <Autocomplete
      multiple
      ref={(e: RefObject<any>) => {
        autoCompleteRef.current = e
      }}
      id="checkboxes-tags-demo"
      options={hashTagList}
      onClose={(e) => {}}
      onChange={(_, v) => {
        console.log(v)
        callback(v)
      }}
      filterSelectedOptions
      filterOptions={(r) => {
        return r
      }}
      getOptionLabel={(option) => {
        // return option.name
        // if (typeof option == "object") {
        return option.name.replace(/\s/gi, "")
        // } else {
        // return hashTagList[0] ? hashTagList[0].name : ""
        // }
      }}
      renderOption={(option, { selected }) => {
        return <React.Fragment>{option.name}</React.Fragment>
      }}
      style={{ width: "650px", marginLeft: "30px" }}
      renderInput={(params) => {
        return (
          <Paper className={classes.root}>
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              style={{ textDecoration: "none" }}
              className={classes.input}
              // label={"본인의 인생영화를 검색또는 태그해주세요"}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  if (autoCompleteRef?.current?.ariaExpanded == "false") {
                    //검색 도움창이 닫혀있을때
                    console.log(selectList)
                    debugger
                    callback(selectList)
                  } else {
                    // setSelectList([hashTagList[0]])
                  }
                }
              }}
              onChange={(e) => {
                setTextField(e.target.value)
                if (e.target.value) {
                  const filterData = allMovieList.filter((iter) => {
                    if (iter.name.indexOf(e.target.value.replace(/\s/gi, "")) !== -1 || iter.name.replace(/\s/gi, "").indexOf(e.target.value) !== -1 || iter.name.indexOf(e.target.value) !== -1 || iter.name.replace(/\s/gi, "").indexOf(e.target.value.replace(/\s/gi, "")) !== -1) {
                      return iter
                    }
                  })

                  setHashTagList(filterData)
                }
              }}
            />

            <Divider className={classes.divider} orientation="vertical" />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon
                onClick={(e) => {
                  callback(selectList)
                }}
              />
            </IconButton>
          </Paper>
        )
      }}
    />
  )
}
