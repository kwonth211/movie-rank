import React, { FunctionComponent, useEffect, useState, useRef } from "react"
import clsx from "clsx"
import PerfectScrollbar from "react-perfect-scrollbar"
import PropTypes from "prop-types"
import { Card, CardActions, CardHeader, CardContent, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TableSortLabel } from "@material-ui/core"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import MainPagination from "../../ranking/mainPagination"
import { IMovie } from "./../../../../interface/IMovie"
import { StatusBullet } from "components"
import { useStyles } from "./style"

const statusColors = {
  delivered: "success",
  pending: "info",
  refunded: "danger",
}

export const RankingList: FunctionComponent<{ rankMovie: IMovie[]; rankMovieCallback: Function }> = ({ rankMovie, rankMovieCallback }) => {
  // const { className, ...rest } = props

  const classes = useStyles()
  const [filterList, setFilterList] = useState<IMovie[]>([])

  const [splitNumber, setSplitNumber] = useState(10)
  let cardRef = React.useRef<any | null>(null)

  useEffect(() => {
    setFilterList(rankMovie)
  }, [rankMovie])

  const viewMore = () => {
    if (splitNumber === 10) {
      // setFilterList(rankMovie)

      cardRef.current.style.transition = "all ease 1s 0s"
      cardRef.current.style.top = "8%"
      setSplitNumber(5)
      rankMovieCallback(10)
    } else {
      // setFilterList(rankMovie.slice(0, 5))

      cardRef.current.style.top = "37%"
      setSplitNumber(10)
      rankMovieCallback(5)
    }
  }
  return (
    <Card
      ref={(e) => {
        cardRef.current = e
      }}
      className={clsx(classes.root)}
    >
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
                  <TableCell style={{ maxWidth: "30px", width: "30px", paddingLeft: "8px" }}>등수</TableCell>
                  <TableCell style={{ textAlign: "center" }}>영화 제목</TableCell>
                  <TableCell>투표 수</TableCell>
                </TableRow>
              </TableHead>
              {filterList.map((movie, i) => (
                <TableRow hover key={movie.code}>
                  <TableCell className={classes.trRank}>{i + 1}</TableCell>
                  <TableCell className={classes.trName}>{movie.name}</TableCell>
                  <TableCell className={classes.trVotes}>{movie.votes}</TableCell>
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
        <Button onClick={viewMore} color="primary" size="small" variant="text">
          view {splitNumber} <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  )
}

// RankingList.propTypes = {
//   className: PropTypes.string,
// }

export default RankingList

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
