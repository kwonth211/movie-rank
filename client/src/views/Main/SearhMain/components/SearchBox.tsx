import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import React, { useState, RefObject } from "react"
import { IMovie } from "../../../../interface/IMovie"
import { IconButton } from "@material-ui/core"
// import "./vote.css"
import { AllMovieAtom } from "../../../../atoms"
import { useRecoilValue } from "recoil"

import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import SearchIcon from "@material-ui/icons/Search"
import { useStyles } from "../style"

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
// const checkedIcon = <CheckBoxIcon fontSize="small" />
interface ISearchProps {
  callback: Function
  styleFlag?: string
  text: string
  movies?: IMovie[]
}

// type Props<T> = {
//   customProp?: string
// } & Omit<AutocompleteProps<T>, "renderInput"> &
//   UseAutocompleteProps<T>

export const SearchBox: React.FunctionComponent<ISearchProps> = ({ callback, styleFlag, text, movies }) => {
  let allMovieState = useRecoilValue<IMovie[]>(AllMovieAtom) // 우선은 recoil로...

  const [hashTagList, setHashTagList] = useState<IMovie[]>([])

  let [selectList, setSelectList] = useState<IMovie[] | []>([])

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
        callback(v)
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
      style={{ marginLeft: "30px" }}
      // style={{ width: "350px" }}
      renderInput={(params) => {
        return (
          <Paper className={classes.root}>
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              style={{ textDecoration: "none" }}
              className={classes.input}
              placeholder={autoCompleteRef?.current?.innerText ? "" : text}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  if (autoCompleteRef?.current?.ariaExpanded == "false") {
                    //검색 도움창이 닫혀있을때
                  } else {
                    setSelectList([hashTagList[0]])
                  }
                }
              }}
              onChange={(e) => {
                setTextField(e.target.value)
                if (e.target.value) {
                  const filterData = allMovieState.filter((iter) => {
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
