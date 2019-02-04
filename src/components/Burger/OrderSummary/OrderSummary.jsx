import React from "react";
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
    <div>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientsSummary}</ul>

      {/* Informando o preço */}
      <p className={classes.Price}>
        Total Price: {props.totalPrice.toFixed(2)}
      </p>

      <p>Continue to Checkout?</p>
      {/* <Link to=''> */}
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        CANCEL
      </Button>
      {/* </Link> */}

      {/* <Link to='/checkout'> */}
      <Button btnType="Success" clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
      {/* </Link> */}
    </div>
  );
};

export default orderSummary;
