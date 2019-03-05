import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ContactDataForm from "../../../components/Order/ContactData/ContactDataForm";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../../store/actions/index";

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
        value: "",
        validation: {
          required: true
        },
        valid: false
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
    loading: false
  };

  checkValidity(value, rules) {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  }

  orderClickedHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let inputId in this.state.orderForm) {
      // Pegar apenas o value de cada input
      formData[inputId] = this.state.orderForm[inputId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  selectChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updateOrderFormElement = {
      ...updatedOrderForm[inputId]
    };
    updateOrderFormElement.value = event.target.value;

    console.log(updatedOrderForm);

    updateOrderFormElement.valid = this.checkValidity(
      updateOrderFormElement.value,
      updateOrderFormElement.validation
    );
    updatedOrderForm[inputId] = updateOrderFormElement;

    this.setState({
      orderForm: updatedOrderForm
    });
  };

  render() {
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(ContactData, axios)));
