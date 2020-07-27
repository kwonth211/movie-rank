import { useState } from "react"

let tempCallback
const useModal = () => {
  const [modalFlag, setModalFlag] = useState(false)
  const [modalTitle, setModalTitle] = useState("") // useModal markup 태그 state로 설정해야함

  const toggle = (title = "", callback = {}) => {
    setModalFlag(!modalFlag)
    setModalTitle(title)

    if (Object.keys(callback).length > 0) tempCallback = callback

    return tempCallback
    // if (callbackOk) {
    //   console.log(callbackOk)
    // }
  }

  return {
    modalFlag,
    toggle,
    modalTitle,
  }
}

export default useModal
