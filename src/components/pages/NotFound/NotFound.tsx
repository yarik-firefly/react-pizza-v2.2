import React from "react";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  return (
    <div className={styles.root}>
      <h3>
        Ничего не найдено <b>😭</b>
      </h3>
      <p>Попробуйте зайти на наш сайт позже 🙄</p>
    </div>
  );
};

export default NotFound;
