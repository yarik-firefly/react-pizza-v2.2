import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./FullPizza.module.scss";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    description: string;
  }>();
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://6490ad001e6aa71680cba4bb.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.error(error);
        alert("Не удалось отобразить товар");
        navigate("/");
      }
    };
    fetchPizza();
  }, []);

  if (!pizza) {
    return <h3 className={styles.root}>Идёт Загрузка...</h3>;
  }
  const { imageUrl, title, price, description } = pizza;
  return (
    <div className="pizza-block-main">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <p>
          <b>Ингридиенты: </b>
          {description}
        </p>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₴</div>
        </div>
      </div>
      <div>
        <Link to="/">
          <button
            style={{ width: 100 }}
            className="button button--outline button--add"
          >
            <span>Назад</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
