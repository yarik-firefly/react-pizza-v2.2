import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector, setSelectCategory } from "../redux/slices/filterSlice";
import { useWhyDidYouUpdate } from "use-why-did-you-update";

const Categories: React.FC = React.memo(() => {
  const { selectCategory } = useSelector(filterSelector);

  const dispatch = useDispatch();
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setSelectCategory(index));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={item}
            className={selectCategory === index ? "active" : ""}
            onClick={() => onChangeCategory(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
