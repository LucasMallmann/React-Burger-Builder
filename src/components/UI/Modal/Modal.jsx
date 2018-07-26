import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
  const classShow = props.show ? classes.Appear : classes.Disappear;
  // style={{
  //   transform: props.show ? "translateY(0)" : "translateY(-100vh)",
  //   opacity: props.show ? "1" : "0"
  // }}
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={[classes.Modal, classShow].join(' ')}>
        {/* vai renderizar qualquer coisa, e o modal vai dar um display */}
        {props.children}
      </div>
    </Aux>
  );
};

export default modal;
