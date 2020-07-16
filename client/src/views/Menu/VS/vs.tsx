import React, { useEffect, useContext } from "react";
import VsModalComponent from "./components/vsModalComponent";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { VsTournament } from "./VsTournament";
import VsGridList from "./VsGridList";
import "./../../../App.css";
import "./../../../index.css";
export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);

  const [vsStart, setVsStart] = React.useState("");

  // if (user) history.replace("/")

  useEffect(() => {
    // setOpen(true);
  }, []);

  const callbackFunction = {
    vsStart: (type) => {
      setVsStart(type);
    },
  };

  return (
    <div>
      {vsStart ? <div>{<VsGridList genre={vsStart} />}</div> : ""}
      <VsModalComponent {...callbackFunction}></VsModalComponent>
    </div>
  );
}
