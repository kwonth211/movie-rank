import React, { useEffect } from "react"
import VsModalComponent from "./components/vsModalComponent"
import VsGridList from "./VsGridList"
import "./../../../App.css"
import "./../../../index.css"
export default function TransitionsModal() {
  const [vsStart, setVsStart] = React.useState("")

  useEffect(() => {
    // setOpen(true);
  }, [])

  const callbackFunction = {
    vsStart: (type) => {
      setVsStart(type)
    },
  }

  return (
    <div>
      {vsStart ? <div>{<VsGridList genre={vsStart} />}</div> : ""}
      <VsModalComponent {...callbackFunction}></VsModalComponent>
    </div>
  )
}
