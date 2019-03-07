import React, { Component } from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    const classShow = this.props.show ? classes.Appear : classes.Disappear;
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={[classes.Modal, classShow].join(" ")}>
          {/* vai renderizar qualquer coisa */}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
