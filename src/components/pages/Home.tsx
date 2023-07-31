import React from "react";
import PizzaSkeleton from "../PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../PizzaBlock";
import Categories from "../Categories";
import Sort from "../Sort";
import AppContext from "../context/context";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterSelector } from "../../redux/slices/filterSlice";
import { pizzaSelector } from "../../redux/slices/pizzaSlice";
import { fetchPizzas } from "../../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  const { selectCategory, selectSort, currentPage } =
    useSelector(filterSelector);

  // Делаю так, потому что только так отображаются скелетон
  let { status } = useSelector(pizzaSelector);

  const { pizzas } = useSelector(pizzaSelector);

  const dispatch = useDispatch();

  const { inputValue } = useSelector(filterSelector);

  React.useEffect(() => {
    dispatch(
      // @ts-ignore
      fetchPizzas({ currentPage, inputValue, selectCategory, selectSort })
    );
  }, [selectCategory, selectSort, inputValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "rejected" ? (
        <div className="content__error-info">
          <h2>
            <b>Не удалось отобразить товар 😢</b>
          </h2>
          <br />
          Попробуйте зайти позже
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
            : pizzas.map((pizza: any) => (
                <PizzaBlock key={pizza.id} {...pizza} />
              ))}
        </div>
      )}
      <Pagination />
    </>
  );
};

export default Home;
