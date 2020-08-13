import React, { FunctionComponent, useEffect, useState, useRef } from "react"
import clsx from "clsx"
import PerfectScrollbar from "react-perfect-scrollbar"
import PropTypes from "prop-types"
import { Card, CardActions, CardHeader, CardContent, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TableSortLabel } from "@material-ui/core"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import MainPagination from "../../ranking/mainPagination"
import { IMovie } from "../../../../interface/IMovie"
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
        // action={
        //   <Button color="primary" size="small" variant="outlined">
        //     New entry
        //   </Button>
        // }
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
                </TableRow>
              ))}
            </Table>
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
