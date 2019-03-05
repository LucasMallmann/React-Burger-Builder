import React from 'react';
import classes from './Button.css';

const Button = (props) => {
  return (
    <button 
    // buttonType = 'Danger' || 'Success'
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
      {props.children}
    </button>
  );
}

export default Button; 