import React from "react";

import Aux from "../../../hoc/Aux";

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
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;
