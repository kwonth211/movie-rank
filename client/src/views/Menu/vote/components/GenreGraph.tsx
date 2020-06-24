import React from "react"
import { Doughnut } from "react-chartjs-2"
import clsx from "clsx"
import PropTypes from "prop-types"
import { useTheme } from "@material-ui/styles"
import { Card, CardHeader, CardContent, IconButton, Divider, Typography } from "@material-ui/core"
import LaptopMacIcon from "@material-ui/icons/LaptopMac"
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone"
import RefreshIcon from "@material-ui/icons/Refresh"
import TabletMacIcon from "@material-ui/icons/TabletMac"
import palette from "../../../../theme/palette"
import { Theme, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
  },
  chartContainer: {
    position: "relative",
    height: "300px",
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1),
  },
  deviceIcon: {
    color: palette.icon,
  },
}))

const UsersByDevice = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()
  const theme = useTheme()

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [palette.primary.main, palette.error.main, palette.warning.main],
        borderWidth: 8,
        borderColor: palette.white,
        hoverBorderColor: palette.white,
      },
    ],
    labels: ["Desktop", "Tablet", "Mobile"],
  }

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      borderColor: palette.divider,
      backgroundColor: palette.white,
      titleFontColor: palette.text.primary,
      bodyFontColor: palette.text.secondary,
      footerFontColor: palette.text.secondary,
    },
  }

  const devices = [
    {
      title: "Desktop",
      value: "63",
      icon: <LaptopMacIcon />,
      color: palette.primary.main,
    },
    {
      title: "Tablet",
      value: "15",
      icon: <TabletMacIcon />,
      color: palette.error.main,
    },
    {
      title: "Mobile",
      value: "23",
      icon: <PhoneIphoneIcon />,
      color: palette.warning.main,
    },
  ]

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="장르별 통계"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {devices.map((device) => (
            <div className={classes.device} key={device.title}>
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography style={{ color: device.color }} variant="h2">
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

UsersByDevice.propTypes = {
  className: PropTypes.string,
}

export default UsersByDevice
