import { useState } from "react"

let tempCallback
const useModal = () => {
  const [modalFlag, setModalFlag] = useState(false)
  const [modalTitle, setModalTitle] = useState("")

  const toggle = (title = "", callback) => {
    setModalFlag(!modalFlag)
    setModalTitle(title)

    if (callback) tempCallback = callback

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
