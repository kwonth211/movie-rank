import React, { useEffect, KeyboardEvent } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"
import { Route, Link } from "react-router-dom"
import useReactRouter from "use-react-router"

const options = ["SF", "스릴러", "로맨스", "모험", "판타지", "재난", "코미디", "드라마", "로맨틱코미디", "키즈"]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)
export function ComboBox(props) {
  const [value, setValue] = React.useState<string | null>(options[0])
  const [inputValue, setInputValue] = React.useState("")
  const classes = useStyles()
  const { history, location, match } = useReactRouter()
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="choice" variant="outlined" />}
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key === "Enter") {
            const filter = options.filter((iter) => iter === inputValue)
            if (filter.length > 0) {
              setValue(filter[0])
              props.vsStart(filter[0])
            }
          }
        }}
      />
    </div>
  )
}
