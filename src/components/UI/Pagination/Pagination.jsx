import ReactPaginate from "react-paginate";
import "./Pagination.css";

export const Pagination = ({ paginationInput, setPaginationInput }) => {
  const handlePageClick = (event) => {
    setPaginationInput({
      ...paginationInput,
      currentPage: event.selected + 1,
    });
  };

  return (
    <div className={`mt-5 Pagination`}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        forcePage={paginationInput.currentPage - 1}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={paginationInput.totalPages}
        previousLabel="<"
        pageClassName="pageList"
        activeClassName="activePage"
        previousClassName="prev"
        nextClassName="next"
        containerClassName="pageBox"
      />
    </div>
  );
};
