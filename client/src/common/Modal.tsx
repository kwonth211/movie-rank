import React, { useEffect, KeyboardEvent, FunctionComponent } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";
import { modalStyles } from "./style";
type modalFlag = {
  show: boolean;
};

// interface KeyboardEvent {
//   enterKey: boolean;
// }

export const ModalComponent: FunctionComponent<{
  modalFlag: boolean;
  title: string;
}> = ({ modalFlag, title }) => {
  const classes = modalStyles();
  const [open, setOpen] = React.useState(false);

  console.log(modalFlag);
  useEffect(() => {
    setOpen(modalFlag);
  }, [modalFlag]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>

            <div>
              <div
                className={classes.button}
                style={{ marginTop: "10px", float: "right" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  취소
                </Button>
                <Button variant="outlined" color="primary" onClick={() => {}}>
                  확인
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;
