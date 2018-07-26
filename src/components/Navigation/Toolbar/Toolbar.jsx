import React from "react";
import classes from "./Toolbar.css";

import Logo from "../../Logo/Logo";

import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = () => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
      <Logo />
    </div>

    <nav className={classes.DesktopOnly}>
      {/* Barra de Navegação com seus links reutilizáveis */}
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
