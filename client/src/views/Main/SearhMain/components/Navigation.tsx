import React, { useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { useNavStyles } from "./style"
import { Button, Typography } from "@material-ui/core"

// const options = ["종합랭킹", "좋아요 순", "장르별 랭킹", "국가별 랭킹", "해쉬태그 추천"]

export const Navigation = () => {
  const classes = useNavStyles()

  const [hashTagFlag, setHashTagFlag] = useState(false)
  const [genreFlag, setGenreFlag] = useState(false)
  const [userInfoFlag, setUserInfoFlag] = useState(false)

  const genreClick = () => {
    setHashTagFlag(false)
    setUserInfoFlag(false)
    setGenreFlag(true)
  }
  const hashTagClick = () => {
    setGenreFlag(false)
    setUserInfoFlag(false)
    setHashTagFlag(true)
  }
  const userInfoClick = () => {
    setGenreFlag(false)
    setHashTagFlag(false)
    setUserInfoFlag(true)
  }
  return (
    <div className={classes.root}>
      <Button>종합랭킹</Button>
      <Button>좋아요 순</Button>
      <Button onClick={genreClick}>장르별 랭킹</Button>
      <Button onClick={userInfoClick}>유저별 랭킹</Button>
      <Button onClick={hashTagClick}>해쉬태그 추천</Button>
      {hashTagFlag ? <HashTagComponent /> : null}
      {genreFlag ? <GenreComponent /> : null}
      {userInfoFlag ? <UserInfoComponent /> : null}
    </div>
  )
}

const hasTagArray = ["비올때 생각나는", "눈물나게 슬픈", "소름끼치는", "웃긴", "실화", "잔인한", "반전", "재난", "신비한"]
// const useNavStyles =
const HashTagComponent = () => {
  const classes = useNavStyles()

  const hashTagDetailClick = (e) => {
    console.log(e.target.innerText)
  }
  return (
    <div className={classes.hashTag}>
      {hasTagArray.map((iter) => {
        return (
          <Button style={{ padding: "10px" }} onClick={hashTagDetailClick}>
            <Typography variant="body2" color="textSecondary">
              #{iter}
            </Typography>
          </Button>
        )
      })}
    </div>
  )
}
const genreArray = ["슈퍼히어로", "스포츠", "범죄", "드라마", "코미디", "로멘스/멜로", "스릴러", "로맨틱코미디", "전쟁", "SF", "판타지", "액션", "애니메이션", "다큐멘터리", "공포"]

// const useNavStyles =
const GenreComponent = () => {
  const classes = useNavStyles()

  return (
    <div className={classes.genre}>
      {genreArray.map((iter, i) => {
        return (
          <>
            <Button style={{ padding: "5px" }}>
              <Typography variant="body2" color="textSecondary">
                #{iter}
              </Typography>
            </Button>
            {i === 9 ? (
              <>
                <br />
                <span style={{ paddingRight: "180px" }}> </span>
              </>
            ) : null}
          </>
        )
      })}
    </div>
  )
}
const userInfoArray = ["남자", "여자", "10대", "20대", "30대"]
// const useNavStyles =
const UserInfoComponent = () => {
  const classes = useNavStyles()

  return (
    <div className={classes.userInfo}>
      {userInfoArray.map((iter) => {
        return (
          <Button style={{ padding: "10px" }}>
            <Typography variant="body2" color="textSecondary">
              #{iter}
            </Typography>
          </Button>
        )
      })}
    </div>
  )
}

export default Navigation
