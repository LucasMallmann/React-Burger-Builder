import React from "react";
import classes from "./NavigationItem.css";

// Isso é um link reutilizável que pode ser utilizado em outros lugares
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;
