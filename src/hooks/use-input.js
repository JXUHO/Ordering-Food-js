import { useState, useEffect } from "react";

const useInput = (validateCondition = () => {return true}) => {
  const [inputState, setInputState] = useState("");
  const [isBlured, setIsBlured] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const inputHandler = (event) => {
    setInputState(event.target.value);
  };

  const blurHandler = () => {
    setIsBlured(true);
  };

  useEffect(() => {
    if (inputState !== "") {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [inputState]);

  const isValid = !isEmpty && validateCondition(inputState)

  return { inputState, isEmpty, isValid, isBlured, inputHandler, blurHandler };
};

export default useInput;
