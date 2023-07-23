import React, { useState, useContext } from "react";

import Checkout from "./Checkout";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [isSended, setIsSended] = useState(false);

  const [openCheckout, setOpenCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setOpenCheckout(true);
  };

  const cancelCheckoutHandler = () => {
    setOpenCheckout(false);
  };

  const sendSuccessHandler = () => {
    setIsSended(true);
  };

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

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes["button--alt"]}>
        Close
      </button>

      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {isSended ? (
        <div className={classes.actions}>
          <p style={{ textAlign: "center", fontSize: "25px" }}>
            sending succeed
          </p>
          <button className={classes.button} onClick={props.onHideCart}>
            Okay
          </button>
        </div>
      ) : (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>

          {!openCheckout && modalActions}

          {openCheckout && (
            <Checkout
              onCancel={cancelCheckoutHandler}
              onSendSuccess={sendSuccessHandler}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default Cart;
