import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions/index";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    console.log(this.props.orders);
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            price={+order.totalPrice}
            ingredients={order.ingredients}
          />
        );
      });
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
