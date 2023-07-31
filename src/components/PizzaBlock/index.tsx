import React from "react";
import AppContext from "../context/context";
import { addToCart, cartSelector } from "../../redux/slices/cart/slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ItemTyping } from "../Cart/CartItem";

export const typePizza = ["тонкое", "традиционное"];
export type BlockTyping = {
  title: string;
  imageUrl: string;
  price: number;
  id: string;
  sizes: number[];
  types: number[];
  count: number;
  description: string;
};
const PizzaBlock: React.FC<BlockTyping> = ({
  title,
  imageUrl,
  price,
  id,
  sizes,
  types,
}) => {
  const [selectType, setSelectType] = React.useState(0);
  const [selectSize, setSelectSize] = React.useState(26);
  const { items } = useSelector(cartSelector);
  const dispatch = useDispatch();

  const addedCount = items.find((obj: ItemTyping) => obj.id === id);
  const count = addedCount ? addedCount.count : 0;

  const onAddItem = () => {
    const item: ItemTyping = {
      title,
      price,
      id,
      imageUrl,
      selectType,
      selectSize,
      count,
    };
    dispatch(addToCart(item));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type: number) => (
              <li
                key={type}
                className={type === selectType ? "active" : ""}
                onClick={() => setSelectType(type)}
              >
                {typePizza[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size) => (
              <li
                key={size}
                className={selectSize === size ? "active" : ""}
                onClick={() => setSelectSize(size)}
              >
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₴</div>
          <button
            onClick={
              onAddItem
              // setCount(count + 1);
            }
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
