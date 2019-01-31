import React from "react";
import { Link } from "react-router-dom";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>

      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>

      {/* <Link> */}
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      {/* </Link> */}

      {/* <Link> */}
      <Button btnType="Success" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
      {/* </Link> */}
    </div>
  );
};

export default CheckoutSummary;
