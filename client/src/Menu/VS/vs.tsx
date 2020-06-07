import React, { useEffect } from "react";
import VsModalComponent from "./vsModalComponent";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { VsTournament } from "./VsTournament";
import VsGridList from "./VsGridList";
export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);

  const [vsStart, setVsStart] = React.useState(false);
  useEffect(() => {
    // setOpen(true);
  }, []);

  const callbackFunction = {
    vsStart: (type) => {
      setVsStart(true);
    },
  };

  return (
    <div>
      {vsStart ? <div>{<VsGridList />}</div> : ""}
      <VsModalComponent {...callbackFunction}></VsModalComponent>
    </div>
  );
}
