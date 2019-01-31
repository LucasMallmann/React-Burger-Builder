import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

// Isso é um link reutilizável que pode ser utilizado em outros lugares
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} activeClassName={classes.active}
      exact={props.exact}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
