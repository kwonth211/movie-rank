import React from "react"
import clsx from "clsx"
import PerfectScrollbar from "react-perfect-scrollbar"
import PropTypes from "prop-types"
import { Card, CardActions, CardHeader, CardContent, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TableSortLabel } from "@material-ui/core"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import { makeStyles } from "@material-ui/core/styles"
import MainPagination from "../../../Main/ranking/mainPagination"

import { StatusBullet } from "components"

const orders = [
  {
    id: "12",
    ref: "CDD1049",
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: "3",
    ref: "CDD1048",
    amount: 25.1,
    customer: {
      name: "Cao Yu",
    },
    createdAt: 1555016400000,
    status: "delivered",
  },
  {
    id: "44",
    ref: "CDD1047",
    amount: 10.99,
    customer: {
      name: "Alexa Richardson",
    },
    createdAt: 1554930000000,
    status: "refunded",
  },
  {
    id: "55",
    ref: "CDD1046",
    amount: 96.43,
    customer: {
      name: "Anje Keizer",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: "66",
    ref: "CDD1045",
    amount: 32.54,
    customer: {
      name: "Clarke Gillebert",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  // {
  //   id: "77",
  //   ref: "CDD1044",
  //   amount: 16.76,
  //   customer: {
  //     name: "Adam Denisov",
  //   },
  //   createdAt: 1554670800000,
  //   status: "delivered",
  // },
]
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    // width: "175px",
    display: "inlineBlock",
    right: "1%",
    /* 창에서 오른쪽 길이 */
    top: "37%",
    // bottom: "14%",
    /* 창에서 위에서 부터의 높이 */
    //  background-color: transparent; margin:0;
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 300,
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

const a = [1, 2, 3, 4]

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
        title="투표 랭킹"
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
                  {/* <TableCell>Status</TableCell> */}
                </TableRow>
              </TableHead>
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.ref}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{20190101}</TableCell>
                  {/* <TableCell>{moment(order.createdAt).format("DD/MM/YYYY")}</TableCell> */}
                  {/* <TableCell>
                    <div className={classes.statusContainer}>
                      <StatusBullet className={classes.status} color={statusColors[order.status]} size="sm" />
                      {order.status}
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </Table>
            {/* <MainPagination /> */}
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
