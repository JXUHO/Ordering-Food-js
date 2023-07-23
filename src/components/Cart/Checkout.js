import CartContext from "../../store/cart-context";
import useInput from "../../hooks/use-input";
import CheckoutInput from "./CheckoutInput";

import classes from "./Checkout.module.css";
import { useContext, useState } from "react";

const isNumber = (value) => /^\d*$/.test(value);

const Checkout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartCtx = useContext(CartContext);
  const nameInput = useInput();
  const streetInput = useInput();
  const postalInput = useInput(isNumber);
  const cityInput = useInput();

  const disableButton = !(
    nameInput.isValid &&
    streetInput.isValid &&
    postalInput.isValid &&
    cityInput.isValid
  );

  const confirmHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let orderArr = [];
    for (let i = 0; i < cartCtx.items.length; i++) {
      orderArr.push({ [cartCtx.items[i].name]: cartCtx.items[i].amount });
    }

    const orderInfo = {
      order: orderArr,
      delivery: {
        name: nameInput.inputState,
        street: streetInput.inputState,
        postal: postalInput.inputState,
        city: cityInput.inputState,
      },
      total: cartCtx.totalAmount.toFixed(2),
    };

    try {
      const response = await fetch(
        "https://react-http-practice-6fe63-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderInfo),
        }
      );
      if (!response.ok) {
        throw new Error("request failed");
      }
      cartCtx.clearItem();
      props.onHideCart();
    } catch (err) {
      setError(err.message);
      console.log(err.message);

    }
    setIsLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <CheckoutInput id="name" input={nameInput} />
      <CheckoutInput id="street" input={streetInput} />
      <CheckoutInput id="postal" input={postalInput}>
        {postalInput.isBlured &&
          !postalInput.isValid &&
          !postalInput.isEmpty && <p>postal should be number</p>}
      </CheckoutInput>
      <CheckoutInput id="city" input={cityInput} />

      <div className={classes.actions}>
        {error && <p>{error}</p>}
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          disabled={disableButton}
          className={classes.submit}
          onClick={confirmHandler}
        >
          {isLoading ? "Sending.." : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default Checkout;
