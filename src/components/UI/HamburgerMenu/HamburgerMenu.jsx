import React from "react";

import classes from "./HamburgerMenu.css";

const HamburgerMenu = props => {
  
  if(props)

  return (
    <div className={classes.HamburgerMenu} onClick={props.clicked}>
      <div className={classes.Bar1} />
      <div className={classes.Bar2} />
      <div className={classes.Bar3} />
    </div>
  );
};

export default HamburgerMenu;
