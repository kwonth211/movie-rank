import React, { useEffect, useState, useRef, useCallback, useReducer, FC, Dispatch } from "react"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import { CssBaseline, Typography, Container } from "@material-ui/core"
import { useStyles } from "./../style"
import { IUser } from "../../../../interface/IUser"

const GridHeaderContent: FC<{ modalCallback: any; user: IUser | null; pickCount: number }> = ({ modalCallback, user, pickCount }) => {
  const classes = useStyles()

  return (
    <>
      <Fab className={classes.addButton} color="primary" aria-label="add" onClick={modalCallback}>
        <AddIcon />
      </Fab>

      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
            {user?.name} 님 , 좋아하는 영화 총 16개를 PICK 해주세요
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            최종 선택 1개의 영화가 투표권수 1개 입니다.
          </Typography>

          <Typography style={{ marginBottom: "-10px" }} variant="h6" align="center" color="textSecondary" paragraph>
            {pickCount}/16
          </Typography>
        </Container>
      </div>
    </>
  )
}

export default GridHeaderContent
