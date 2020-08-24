import React, { useEffect, useState, useRef, useCallback, useReducer } from "react"
import { CssBaseline } from "@material-ui/core"
import gql from "../../../graphql/query"
import { useLazyQuery } from "@apollo/react-hooks"
import ProgressModelComponent from "../../../common/ProgressModelComponent"
import { useStyles } from "./style"

import MymovieDialog from "./components/MymovieDialog"
import { useRecoilValue } from "recoil"
import { UserState } from "../../../atoms"
import { IUser, IMovie } from "./../../../interface"

import MovieDetail from "../MovieDetail/movieDetail"
import { VsTournament } from "./VsTournament"
import { ModalComponent as Modal, useModal, useScroll } from "../../../common"

import { GridContainer, GridHeaderContent } from "./components"
interface initialType {
  movieDialog: false
  totalImage: IMovie[]
  imageArr: IMovie[]
  tournamentFlag: boolean
  pickMovie: IMovie[]
  fixtotalImage: IMovie[]
}

const initialState: initialType = {
  movieDialog: false,
  totalImage: [],
  imageArr: [],
  tournamentFlag: false,
  pickMovie: [],
  fixtotalImage: [],
}

const reducer = (state, { type, value }) => {
  switch (type) {
    case "SET_TOTAL":
      state = {
        ...state,
        totalImage: [...value],
        fixtotalImage: [...value],
      }
      break
    case "SET_MOVIELIST":
      if (value.length > 0) {
        state = {
          ...state,
          imageArr: [...value, ...state.totalImage.splice(0, 6)],
        }
      } else {
        state = {
          ...state,
          imageArr: [...state.totalImage.splice(0, 18)],
        }
      }
      break
    case "SET_MODAL":
      state = {
        ...state,
        movieDialog: value,
      }
      break
    case "SET_PICKMOVIE":
      state = {
        ...state,
        pickMovie: value,
      }
      break
    case "SET_TOURNAMENT":
      state = {
        ...state,
        tournamentFlag: value,
      }
      break
  }
  // debugger
  return state
}

const VsGridList: React.FunctionComponent<{ genre: String }> = ({ genre, children }) => {
  const classes = useStyles()

  const [state, dispatch] = useReducer(reducer, initialState)

  let { movieDialog, totalImage, imageArr, tournamentFlag, pickMovie, fixtotalImage } = state
  let [searchMovieList, setSearchMovieList] = useState<IMovie[]>([]) //검색 리스트
  const user = useRecoilValue<IUser | null>(UserState)

  const [getMovieGenre, { called, loading, data }] = useLazyQuery(gql.GETMOVIEGENRE)
  // let [tournamentFlag, setTournamentFlag] = useState(false)

  const { percentage } = useScroll()
  const { modalFlag: commonModal, toggle, modalTitle } = useModal()

  const pickCount = pickMovie.length

  /* Todo 
  
  장르 속도개선 해야함..*/
  useEffect(() => {
    getMovieGenre({ variables: { genre } })
    let imageList = data?.getMovieGenre
    // 60개의 배열을 미리 담는다 / 동시에 전체 영화리스트에서 제외시킨다
    if (imageList) {
      imageList = imageList.filter((iter) => iter.imgUrl)
      let copyImageList = imageList.map((e) => e)
      let totalImageTemp = []
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
          const randomInt = Math.floor(Math.random() * (imageList.length - 0 + 1)) + 0
          let spliceData = imageList.splice(randomInt - 1, 1)[0]
          if (spliceData && Object.keys(spliceData).length > 0) {
            totalImageTemp = totalImageTemp.concat(spliceData)
          }
        }
      }
      setSearchMovieList([...copyImageList])
      dispatch({
        type: "SET_TOTAL",
        value: totalImageTemp,
      })
    }
  }, [data])

  useEffect(() => {
    dispatch({
      type: "SET_MOVIELIST",
      value: [],
    })
  }, [totalImage])

  useEffect(() => {
    if (percentage >= 80) {
      dispatch({
        type: "SET_MOVIELIST",
        value: imageArr,
      })
    }
  }, [percentage])

  const modalCallback = useCallback(
    (movies) => {
      if (movies && Array.isArray(movies)) {
        dispatch({ type: "SET_TOTAL", value: movies })
        // setTotalImage([...movies])
        // setFixtotalImage([...movies])
      } else {
      }

      dispatch({
        type: "SET_MODAL",
        value: !movieDialog,
      })
    },
    [movieDialog]
  )

  const tournamentStart = () => {
    toggle("토너먼트를 시작하시겠습니까?", {
      callback: () => {
        dispatch({ type: "SET_TOURNAMENT", value: true })
      },
    })
  }

  if (called && loading) return <ProgressModelComponent />

  if (tournamentFlag) {
    return <VsTournament pickMovie={pickMovie} />
  } else {
    return (
      <React.Fragment>
        <Modal modalFlag={commonModal} toggle={toggle} title={modalTitle} />

        <CssBaseline />

        <main id={"top"}>
          {/* Hero unit */}
          <MymovieDialog open={movieDialog} callback={modalCallback} searchList={searchMovieList} totalImage={fixtotalImage} />

          <GridHeaderContent modalCallback={modalCallback} user={user} pickCount={pickCount} />

          <GridContainer modalCallback={modalCallback} imageArr={imageArr} dispatch={dispatch} pickMovie={pickMovie} fixtotalImage={fixtotalImage} tournamentStart={tournamentStart} />
        </main>

        {/* Footer */}
        <footer className={classes.footer}></footer>
        {/* End footer */}
      </React.Fragment>
    )
  }
}

export default VsGridList
