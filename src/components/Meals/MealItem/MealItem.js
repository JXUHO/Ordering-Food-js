import React, {useContext} from 'react';

import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css'


const MealItem = (props) => {
  const cartCtx = useContext(CartContext)

  const price = `$${props.price.toFixed(2)}`

  const addToCartHandler = (amount) => {  // MealItemForm에서 입력받은 숫자를 amount로 전달받음. 
    cartCtx.addItem({  // CartProvider에서 정의된 addItemToCartHandler에 아래 객체를 인자로 전달함
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }
  
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
