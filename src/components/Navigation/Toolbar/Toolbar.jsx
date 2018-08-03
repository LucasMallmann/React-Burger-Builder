import React from "react";
import classes from "./Toolbar.css";

import Logo from "../../Logo/Logo";

import NavigationItems from "../NavigationItems/NavigationItems";
import HamburgerMenu from '../../UI/HamburgerMenu/HamburgerMenu';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <HamburgerMenu clicked={props.drawerToggleClick}/>
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      {/* Barra de Navegação com seus links reutilizáveis */}
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
