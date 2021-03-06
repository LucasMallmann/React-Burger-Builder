import React from "react";
import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}

      {/* Button para mostrar o modal */}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        // onclick vai alterar o estado de 'purchasing' no componente burger builder
        onClick={props.purchasing}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}9468d9862caeddff9017b513bac8bf221
      </button>
    </div>
  );
};

export default buildControls;
