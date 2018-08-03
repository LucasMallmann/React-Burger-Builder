import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/Sidedrawer/Sidedrawer";

import classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  sideDrawerToggleHandler = () => {
    // Set the state when I deppend on the old state
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClick={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />

        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
