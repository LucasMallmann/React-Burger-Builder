import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    const classShow = this.props.show ? classes.Appear : classes.Disappear;
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={[classes.Modal, classShow].join(" ")}>
          {/* vai renderizar qualquer coisa */}
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
