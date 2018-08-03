import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

// CSS CLASSES
import classes from "./Sidedrawer.css";

const sideDrawer = props => {

  let openCloseToogle = props.open ? classes.Open : classes.Close;

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />

      <div className={[classes.Sidedrawer, openCloseToogle].join(" ")} >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
