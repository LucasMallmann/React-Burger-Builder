import React, { Component } from "react";
import Aux from "../../hoc/Aux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};


class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

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
    console.log(this.state.purchasable);
  }

  purchaseHandlers = () => {
    this.setState({ purchasing: true });
  }

  // Vai alterar o estado de 'comprando' para falso.
  // Isso irá cancelar o modal
  purchaseCancelHandler = () => {
    this.setState( { purchasing: false } );
  };

  purchaseContinueHandler = () => {
    alert('you continue');
  }

  render() {
    // Faz uma cópia do state
    const disabledInfo = {
      ...this.state.ingredients
    };

    // Vai verificar se cada chave é menor ou igual a 0 e atribuir valor de True ou False
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary ingredients={this.state.ingredients} 
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}/>
        </Modal>

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
  }
}

export default BurgerBuilder;
