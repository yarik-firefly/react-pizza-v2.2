import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectSortTyping,
  filterSelector,
  setSelectSort,
} from "../redux/slices/filterSlice";
import { useWhyDidYouUpdate } from "use-why-did-you-update";

type SortTyping = {
  name: string;
  sort: string;
};

export const sortType: SelectSortTyping[] = [
  { name: "популярности", sort: "rating" },
  { name: "цене", sort: "price" },
  { name: "алфавиту", sort: "title" },
];

const Sort: React.FC = React.memo(() => {
  const { selectSort } = useSelector(filterSelector);
  const dispatch = useDispatch();
  const [popupWindow, setPopupWindow] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const addSort = React.useCallback((sort: SelectSortTyping) => {
    dispatch(setSelectSort(sort));
    setPopupWindow(false);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        composedPath(): Node[];
      };
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setPopupWindow(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setPopupWindow(!popupWindow)} className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <b>Сортировка по:</b>
        <span>{selectSort.name}</span>
      </div>
      {popupWindow && (
        <div className="sort__popup">
          <ul>
            {sortType.map((sort, index) => (
              <li
                key={sort.name}
                className={sort.name === selectSort.name ? "active" : ""}
                onClick={() => addSort(sort)}
              >
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
