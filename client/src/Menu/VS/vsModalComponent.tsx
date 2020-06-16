import React, { useEffect, KeyboardEvent } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import useReactRouter from "use-react-router"

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

type modalFlag = {
  show: boolean
}

// interface KeyboardEvent {
//   enterKey: boolean;
// }

export default function VsModalComponent(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])
  const callbackFunction = {
    vsStart: (type) => {
      setOpen(false)
      props.vsStart(type)
    },
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">영화 장르를 선택하세요</h2>
            <ComboBox {...callbackFunction} />
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

// const options = ["SF", "스릴러", "로맨스", "모험", "판타지", "재난", "코미디", "드라마", "로맨틱코미디", "키즈", "전쟁"]
const options = ["슈퍼히어로", "스포츠", "범죄", "드라마", "코미디", "로멘스/멜로", "스릴러", "로맨틱코미디", "전쟁", "판타지", "SF", "액션", "애니메이션", "다큐멘터리", "공포"]

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
      <div className={classes.button} style={{ marginTop: "10px", float: "right" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary">
            취소
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            const filter = options.filter((iter) => iter === value)
            props.vsStart(filter[0])
          }}
        >
          확인
        </Button>
      </div>
    </div>
  )
}
