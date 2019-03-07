import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

// CSS CLASSES
import classes from "./Sidedrawer.css";

const sideDrawer = props => {
  let openCloseToogle = props.open ? classes.Open : classes.Close;

  return (
    <div>
      <Backdrop show={props.open} clicked={props.closed} />

      <div
        className={[classes.Sidedrawer, openCloseToogle].join(" ")}
        onClick={props.closed}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </div>
  );
};

export default sideDrawer;
