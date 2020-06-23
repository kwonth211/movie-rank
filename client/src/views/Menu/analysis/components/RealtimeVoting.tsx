import React from "react"
import clsx from "clsx"
import PerfectScrollbar from "react-perfect-scrollbar"
import PropTypes from "prop-types"
import { Card, CardActions, CardHeader, CardContent, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TableSortLabel } from "@material-ui/core"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}))

const statusColors = {
  delivered: "success",
  pending: "info",
  refunded: "danger",
}

export const LatestOrders = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button color="primary" size="small" variant="outlined">
            New entry
          </Button>
        }
        title="실시간 투표 현황"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>영화 제목</TableCell>
                  <TableCell>투표자 명</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{/* {a.map((order) => (
                ))} */}</TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  )
}

LatestOrders.propTypes = {
  className: PropTypes.string,
}

export default LatestOrders
