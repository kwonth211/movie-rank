import React from "react"
import clsx from "clsx"
import PropTypes from "prop-types"
// import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import { Theme, createStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/styles"
import palette from "../../../../../theme/palette"

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: "100%",
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
    },
    content: {
      alignItems: "center",
      display: "flex",
    },
    title: {
      fontWeight: 700,
    },
    avatar: {
      backgroundColor: "white",
      color: palette.primary.main,
      height: 56,
      width: 56,
    },
    icon: {
      height: 32,
      width: 32,
    },
  }
})

const TotalProfit = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.title} color="inherit" gutterBottom variant="body2">
              TOTAL PROFIT
            </Typography>
            <Typography color="inherit" variant="h3">
              $23,200
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

TotalProfit.propTypes = {
  className: PropTypes.string,
}

export default TotalProfit
