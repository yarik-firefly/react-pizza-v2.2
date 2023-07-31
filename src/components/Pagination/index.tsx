import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import { useWhyDidYouUpdate } from "use-why-did-you-update";
import React from "react";

const Pagination: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const onChangePage = (e: any) => {
    dispatch(setCurrentPage(e.selected));
  };

  useWhyDidYouUpdate("Pagination", { onChangePage });

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
});

export default Pagination;
