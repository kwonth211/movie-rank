import * as React from "react"
import { useState, useRef, useCallback } from "react"
import { Button, AppBar, IconButton, Typography, Toolbar } from "@material-ui/core/"
import { prependOnceListener } from "cluster"
type GreetingsProps = {
  name: string
  mark: string
  count: number
}
interface IGreertingProps {}

function Greetings({ name, mark, count }: GreetingsProps) {
  const [first, setFirst] = useState<number>(Math.random() * 9)
  const [second, setsecond] = useState(Math.random() * 9)
  const [value, setValue] = useState(Math.random() * 9)
  const inputEl = useRef(null)
  // const [value, setValue] = useState(Math.random() * 9)
  // const [value, setValue] = useState(Math.random() * 9)

  const onSubmitForm = (e: React.FormEvent) => {
    // e,preventDefault()
    // const input = inputEl.current
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit" onClick={(e) => {}}>
            <input ref={inputEl} type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}></input>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <Button variant="contained" color="primary" onClick={(e) => {}}>
          click me
        </Button>

        <div>
          {name} {mark}
        </div>
      </div>
    </div>
  )
}

Greetings.defaultProps = {
  mark: "!",
}

export default Greetings
