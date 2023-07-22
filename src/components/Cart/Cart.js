import React, { useState, useContext } from "react";

import Checkout from "./Checkout";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [openCheckout, setOpenCheckout] = useState(false);
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
  const orderHandler = () => {
    if (hasItems){  // items array not empty ... open checkout
      setOpenCheckout(true);
    } else {
      // something should be inside of the cart
    }
    //console.log(cartCtx.items)
  }

  const cancelCheckoutHandler = () => {
    setOpenCheckout(false);
  }


  const confirmCheckoutHandler = () => {

  }



/** order버튼 누르면 Checkout form 나오고, 사용자 입력받으면 order
 * order누르면 서버로 fetch post
 * Available meals는 서버에서 가지고옴
 * 
 * 1. fetch로 DUMMY_MEALS를 fetch함...   (해결)
 * 2. backend data를 가지고와서 meals를 AvailableMeals에서 MealItem으로 보냄   (해결)
 * 3. error, loading state 처리하기   (해결)
 * 4. Cart의 Order버튼을 누르면 checkout form 표시  (해결)
 * 5. checkout form에서 사용자 입력(주소, 이름)받고 order 누르면 backend로 fetch
 * 
 */


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
          <button onClick={orderHandler} className={classes.button}>
            Order
          </button>
        )}
      </div>
      {hasItems && openCheckout && <Checkout onCancel={cancelCheckoutHandler} onConfirm={confirmCheckoutHandler}/>}
    </Modal>
  );
};

export default Cart;
