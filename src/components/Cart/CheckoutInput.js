import classes from "./Checkout.module.css"

const CheckoutInput = (props) => {
  let invalidStyle = props.input.isBlured && props.input.isEmpty

  return (
    <div className={`${classes.control} ${invalidStyle && classes.invalid}`}>
      <label htmlFor={props.id}> {props.id.charAt(0).toUpperCase() + props.id.slice(1)}</label>
      <input
        type="text"
        id={props.id}
        onChange={props.input.inputHandler}
        onBlur={props.input.blurHandler}
      />
      {props.input.isBlured && props.input.isEmpty && (
        <p>You can't leave this empty</p>
      )}
      {props.children}
    </div>
  );
};

export default CheckoutInput;
