import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState();

  useEffect(() => {
    const getMeals = async () => {
      try {
        const response = await fetch(
          "https://react-http-practice-6fe63-default-rtdb.asia-southeast1.firebasedatabase.app/meals/-N_sGEsZVH0lkXMeoB3q.json"
        );
        if (!response.ok) {
          throw new Error("request failed");
        }
        const data = await response.json();

        const meals = [];
        data.forEach((meal) => {
          meals.push(
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          );
        });
        setMealsList(meals)

      } catch (error) {
        console.log(error);
      }
    };
    getMeals();
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
