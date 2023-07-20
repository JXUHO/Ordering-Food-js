import React, { useContext } from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemove = (id) => {
    cartCtx.removeItem(id)
  };
  const cartItemAdd = (item) => {
    cartCtx.addItem({...item, amount: 1})
  };

/////////////////////////////
  const onOrder = () => {
    
  }





////////////////////////////
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={() => cartItemRemove(item.id)}
          onAdd={() => cartItemAdd(item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && (
          <button onClick={null} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
