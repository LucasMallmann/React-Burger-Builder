import React, { Component } from "react";
import Aux from "../../hoc/Aux";

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
    // ingredients: null,
    ingredients: null,
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
        this.setState({error: true});
      });
  }

  addIngredientHandler = type => {
    // quantidade de quantos ingredients tinha antes de adicionar
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
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
    const oldCount = this.state.ingredients[type];

    // CASO NÃO HAJA MAIS INGREDIENTES PARA REMOVER, NÃO FAÇA NADA
    if (oldCount <= 0) {
      return;
    }

    // decrementa uma quantidade no ingrediente
    const updatedCount = oldCount - 1;

    // Copia o state de ingredients, pois não podemos modificar o original...só a cópia
    const updatedIngredients = {
      ...this.state.ingredients
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
    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {

    // Faz uma cópia do state
    const disabledInfo = {
      ...this.state.ingredients
    };

    // Vai verificar se cada chave é menor ou igual a 0 e atribuir valor de True ou False
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          {/* O Hamburger mesmo rsrs */}
          <Burger ingredients={this.state.ingredients} />

          {/* Botões para add ou remover ingredientes */}
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            // ALTERAR O ESTADO DE COMPRANDO, PARA SUMIR COM O MODAL
            purchasing={this.purchaseHandlers}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
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
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
