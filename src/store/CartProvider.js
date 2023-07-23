import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = [...state.items];  // context에서 관리하는 state객체의 최신 items properties를 받아옴
    const itemIndex = updatedItems.findIndex(  
      (item) => item.id === action.item.id  // MealItem에서 전달된, 사용자가 입력한 객체의 id가 state의 items와 일치하는 인덱스를 찾음
    );

    if (itemIndex >= 0) {  // 이미 items array에 해당 id가 있으면 최신 items 배열의 amount를 추가
      updatedItems[itemIndex].amount += action.item.amount;
    } else {
      updatedItems.push(action.item);
    }
    return {  // 새로운 state를 return한다. useReducer의 cartState.
      items: updatedItems,
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
    };
  }

  if (action.type === "REMOVE") {
    const updatedItems = [...state.items];
    const itemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );

    if (updatedItems[itemIndex].amount > 1) {
      updatedItems[itemIndex].amount -= 1;
    } else {
      updatedItems.splice(itemIndex, 1);
    }

    return {
      items: updatedItems,
      totalAmount: state.totalAmount - state.items[itemIndex].price,
    };
  }

  if (action.type === "CLEAR"){
    return defaultCartState
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearItemFromCartHandler = () => {
    dispatchCartAction({type: "CLEAR"})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItem: clearItemFromCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
