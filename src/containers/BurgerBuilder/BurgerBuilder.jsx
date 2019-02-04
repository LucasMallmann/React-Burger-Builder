import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  addIngredientHandler = type => {
    // quantidade de quantos ingredients tinha antes de adicionar
    const oldCount = this.props.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.props.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAdittion = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdittion;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    // Obter a quantidade de ingredients que já tem
    const oldCount = this.props.ingredients[type];

    // CASO NÃO HAJA MAIS INGREDIENTES PARA REMOVER, NÃO FAÇA NADA
    if (oldCount <= 0) {
      return;
    }

    // decrementa uma quantidade no ingrediente
    const updatedCount = oldCount - 1;

    // Copia o state de ingredients, pois não podemos modificar o original...só a cópia
    const updatedIngredients = {
      ...this.props.ingredients
    };

    // Atualiza a cópia do estado com a nova quantidade de ingredientes
    updatedIngredients[type] = updatedCount;

    // Calcula o preço novo baseado no preço antigo
    const oldPrice = this.state.totalPrice;
    const priceAdittion = INGREDIENTS_PRICES[type];
    const newPrice = oldPrice - priceAdittion;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState(ingredients) {
    // transforme o objeto em array de chaves
    // e faça um loop para obter os valores dessas chaves no objeto cópia do estado.
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });
  }

  purchaseHandlers = () => {
    this.setState({ purchasing: true });
  };

  // Vai alterar o estado de 'comprando' para falso.
  // Isso irá cancelar o modal
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  /**
   * It is going to post data to the server
   */
  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }

    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    // Faz uma cópia do state
    const disabledInfo = {
      ...this.props.ingredients
    };

    // Vai verificar se cada chave é menor ou igual a 0 e atribuir valor de True ou False
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <div>
          {/* O Hamburger mesmo rsrs */}
          <Burger ingredients={this.props.ingredients} />

          {/* Botões para add ou remover ingredientes */}
          <BuildControls
            ingredientAdded={() => this.props.onAddIngredientHandler}
            ingredientRemoved={this.props.onRemoveIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            // ALTERAR O ESTADO DE COMPRANDO, PARA SUMIR COM O MODAL
            purchasing={this.purchaseHandlers}
          />
        </div>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredientHandler: (ingredient) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredient
    }),
    onRemoveIngredientHandler: (ingredient) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredient
    })
  };
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
