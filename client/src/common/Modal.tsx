import React, { FunctionComponent } from "react"
import ReactDOM from "react-dom"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Button from "@material-ui/core/Button"
import { modalStyles } from "./style"
type modalFlag = {
  modalFlag: boolean
  toggle: Function
  title: string
}

export const ModalComponent: FunctionComponent<modalFlag> = ({ modalFlag, toggle, title }) => {
  const classes = modalStyles()

  if (modalFlag) {
    return ReactDOM.createPortal(
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={true}
          // onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={true}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">{title}</h2>

              <div>
                <div className={classes.button} style={{ marginTop: "10px", float: "right" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      toggle()
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      toggle().callback()
                      // a.callback()
                    }}
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>,
      document.body
    )
  } else {
    return null
  }
}

export default ModalComponent
