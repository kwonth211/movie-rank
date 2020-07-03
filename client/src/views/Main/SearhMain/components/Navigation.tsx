import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
)

const options = ["범죄", "드라마", "코미디", "로멘스/멜로", "스릴러", "로맨틱코미디", "판타지", "SF", "액션", "애니메이션", "다큐멘터리", "공포"]

export const Navigation = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {options.map((iter) => (
        <Button>{iter}</Button>
      ))}
    </div>
  )
}

export default Navigation
