import React from "react";
import classes from "./Order.css";

const Order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      ingredientName: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map((ingredient, idx) => {
    return (
      <span
        style={{
          display: "inline-block",
          margin: "0 8px",
          padding: "8px",
          border: "1px solid #eee"
        }}
        key={idx}
      >
        {ingredient.ingredientName} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong> ${props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
