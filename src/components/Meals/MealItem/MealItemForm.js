import React, { useRef, useState } from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;  // 사용자가 입력한 숫자
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);  // MealItem에서 props로 전달받은 onAddToCart함수에 숫자 전달
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}  // 사용자가 입력한 숫자
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">Add</button>
      {!amountIsValid && <p>please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
