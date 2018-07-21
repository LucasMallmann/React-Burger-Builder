import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
  // se show == true, retorne a div, se não...não retorne nada
  props.show ? <div className={ classes.Backdrop } onClick={props.clicked}></div> : null
);

export default backdrop;