import { useState } from "react";
import classes from "./Checkout.module.css";

const validCheck = (event) => {
  if (event.target.id === "name") {
    return event.target.value.length > 0;
  } else if (event.target.id === "street") {
    return event.target.value.length > 0;
  } else if (event.target.id === "postal") {
    return event.target.value.length > 0 && /^\d*$/.test(event.target.value);
  } else if (event.target.id === "city") {
    return event.target.value.length > 0;
  }
};

const Checkout = (props) => {
  const [checkoutInputs, setCheckoutInputs] = useState({
    name: "",
    street: "",
    postal: "",
    city: "",
  });
  const [isCheckoutInputsValid, setIsCheckoutInputsValid] = useState({
    name: false,
    street: false,
    postal: false,
    city: false,
  });
  const [isCheckoutInputsBlured, setIsCheckoutInputsBlured] = useState({
    name: false,
    street: false,
    postal: false,
    city: false,
  });
  /**
   * 1. checkoutInputs 객체에 valid도 각각 추가해서 관리
   * 2. valid 객체 state따로 선언해서 관리
   * 3. custom hook으로 만들기
   */

  const checkoutInputsHandler = (event) => {
    setCheckoutInputs({
      ...checkoutInputs,
      [event.target.id]: event.target.value,
    });

    setIsCheckoutInputsValid({
      ...isCheckoutInputsValid,
      [event.target.id]: validCheck(event),
    });
  };

  const blurHandler = (event) => {
    setIsCheckoutInputsBlured({
      ...isCheckoutInputsBlured,
      [event.target.id]: true,
    });
  }


  const confirmHandler = (event) => {
    event.preventDefault();
    console.log(checkoutInputs);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={checkoutInputsHandler} onBlur={blurHandler}/>
        {isCheckoutInputsBlured.name && !isCheckoutInputsValid.name && <p>please enter name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" onChange={checkoutInputsHandler} onBlur={blurHandler}/>
        {isCheckoutInputsBlured.street && !isCheckoutInputsValid.street && <p>please enter street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" onChange={checkoutInputsHandler} onBlur={blurHandler}/>
        {isCheckoutInputsBlured.postal && !isCheckoutInputsValid.postal && <p>please enter postal. postal should be number</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" onChange={checkoutInputsHandler} onBlur={blurHandler}/>
        {isCheckoutInputsBlured.city && !isCheckoutInputsValid.city && <p>please enter city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={props.onConfirm}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
