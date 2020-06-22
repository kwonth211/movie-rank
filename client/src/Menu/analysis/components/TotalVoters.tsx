import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import MoneyIcon from "@material-ui/icons/Money"
import { Theme, createStyles, ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles"
// import {  } from "@material-ui/styles"
import palette from "../../../theme/palette"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    // fontWeight: 700,
  },
  avatar: {
    backgroundColor: palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  caption: {
    color: "",
  },
}))

const TotalVoters = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
              총 투표자 수
            </Typography>
            <Typography variant="h4">1,111명</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            작년 대비
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

TotalVoters.propTypes = {
  className: PropTypes.string,
}

export default TotalVoters
