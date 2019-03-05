import React from "react";

import Logo from "../../Logo/Logo";
import classes from "./Toolbar.css";

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
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;
