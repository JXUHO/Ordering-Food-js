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
  const onOrderItems = () => {
    //console.log(cartCtx.items)
  }


/** order버튼 누르면 Checkout form 나오고, 사용자 입력받으면 order
 * order누르면 서버로 fetch post
 * Available meals는 서버에서 가지고옴
 * 
 * 1. fetch로 DUMMY_MEALS를 fetch함... (해결)
 * 2. backend data를 가지고와서 meals를 AvailableMeals에서 MealItem으로 보냄(해결)
 * 3. Cartd의 Order버튼을 누르면 checkout form 표시(component로 분리할지는 미정)
 * 4. checkout form에서 사용자 입력(주소, 이름)받고 order 누르면 backend로 fetch
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
          <button onClick={onOrderItems} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
