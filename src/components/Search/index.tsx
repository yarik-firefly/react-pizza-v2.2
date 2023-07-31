import React from "react";
import styles from "./Search.module.scss";
import AppContext from "../context/context";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector } from "../../redux/slices/filterSlice";
import { setInputValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const [localInputValue, setLocalInputValue] = React.useState("");
  const { inputValue } = useSelector(filterSelector);
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setInputValue(str));
    }, 500),
    []
  );

  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    setLocalInputValue("");
    dispatch(setInputValue(""));
    inputRef.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={localInputValue}
        className={styles.input}
        type="text"
        placeholder="Введите название..."
        onChange={(e) => onChangeInput(e)}
      />
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="512"
        height="512"
      >
        <g id="_01_align_center" data-name="01 align center">
          <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
        </g>
      </svg>
      {localInputValue && (
        <svg
          onClick={onClickClear}
          className={styles.closeIco}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="close"
        >
          <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
        </svg>
      )}
    </div>
  );
};

export default Search;
