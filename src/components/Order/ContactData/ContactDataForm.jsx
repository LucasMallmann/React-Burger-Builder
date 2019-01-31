import React from "react";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import classes from "./ContactDataForm.css";

const ContactDataForm = props => {
  const orderFormArray = [];

  for (let key in props.orderForm) {
    orderFormArray.push({
      id: key,
      config: props.orderForm[key]
    });
  }

  return (
    <div className={classes.ContactDataForm}>
      <h4>Enter your contact data</h4>
      <form onSubmit={props.orderClicked}>
        {/* Criando os elementos de Input dinamicamente */}
        {orderFormArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => props.changed(event, formElement.id)}
          />
        ))}

        <Button btnType="Success">
          ORDER
        </Button>
      </form>
    </div>
  );
};

export default ContactDataForm;
