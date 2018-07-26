import React from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

import classes from "./OrderSummary.css";

const orderSummary = props => {
  // pegar os ingredients como um Objeto
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    // acessa cada chave do objeto como um ingrediente. Retorna uma li com os dados
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientsSummary}</ul>

      {/* Informando o preço */}
      <p className={classes.Price}>
        Total Price: {props.totalPrice.toFixed(2)}
      </p>

      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        CANCEL
      </Button>

      <Button btnType="Success" clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
