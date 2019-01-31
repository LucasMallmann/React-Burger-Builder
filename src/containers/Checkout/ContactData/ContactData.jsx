import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ContactDataForm from "../../../components/Order/ContactData/ContactDataForm";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP CODE"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        value: ""
      }
    },
    loading: false,
    price: 0
  };

  checkValidity (value, rules) {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    return isValid
  }

  orderClickedHandler = event => {
    event.preventDefault();
    // TODO: IMPLEMENT A POST IN THE DATABASE
    this.setState({ loading: true });

    const formData = {};
    for (let inputId in this.state.orderForm) {
      // Pegar apenas o value de cada input
      formData[inputId] = this.state.orderForm[inputId].value;
    }

    console.log(formData);

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData
    };

    // It could be any endpoint I want
    axios
      .post("order.json", order)
      .then(response => {
        this.setState({ loading: false });
        console.log(response);
        // Redirecionar para outra página
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  selectChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    // O Element é um objeto que vai conter o orderForm element aninhado.
    // country: {
    //   elementType: "input",
    //   elementConfig: {
    //     type: "text",
    //     placeholder: "Country"
    //   },
    //   value: ""
    // }
    const updateOrderFormElement = {
      ...updatedOrderForm[inputId]
    };
    updateOrderFormElement.value = event.target.value;
    updateOrderFormElement.valid = this.checkValidity(updateOrderFormElement.value, updateOrderFormElement.validation);
    updatedOrderForm[inputId] = updateOrderFormElement;

    console.log(updateOrderFormElement);

    this.setState({
      orderForm: updatedOrderForm
    });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <ContactDataForm
          ingredients={this.props.ingredients}
          orderClicked={this.orderClickedHandler}
          orderForm={this.state.orderForm}
          changed={this.selectChangedHandler}
        />
      );
    }
  }
}

export default withRouter(ContactData);
