import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../reducers/search";
import { setShownSeries } from "../../reducers/shownSeries";
import PageItem from "./PageItem";
import "./Pagination.css";

const Pagination = () => {
  const { filteredSeries } = useSelector((state) => state.filteredSeries);
  const { currentPage } = useSelector((state) => state.search);
  const seriesPerPage = 1;
  const totalSeries = filteredSeries.length;
  const dispatch = useDispatch();

  const indexOfLastSeries = currentPage * seriesPerPage;
  const indexOfFirstSeries = indexOfLastSeries - seriesPerPage;

  const currentSeries = filteredSeries.slice(
    indexOfFirstSeries,
    indexOfLastSeries
  );

  useEffect(() => {
    dispatch(setShownSeries(currentSeries));
  }, [currentPage, filteredSeries]);

  const pageNumbers = Math.ceil(totalSeries / seriesPerPage) || 1;
  const getPageRange = () => {
    const totalPages = pageNumbers;
    const currentPageIndex = currentPage - 1;
    const minPageIndex = Math.max(0, currentPageIndex - 2);
    const maxPageIndex = Math.min(minPageIndex + 4, totalPages - 1);
    return [minPageIndex, maxPageIndex];
  };

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const [minPageIndex, maxPageIndex] = getPageRange();

  const renderPageItems = () => {
    const pageItems = [];
    for (let i = minPageIndex; i <= maxPageIndex; i++) {
      pageItems.push(
        <PageItem
          key={i}
          number={i + 1}
          currentPage={currentPage}
          paginate={paginate}
        />
      );
    }
    return pageItems;
  };

  return (
    <nav>
      <ul className="pagination">
        {currentPage !== 1 && (
          <>
            <PageItem
              number={1}
              text="<<"
              currentPage={currentPage}
              paginate={paginate}
            />
            <PageItem
              number={currentPage - 1}
              text="<"
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
        {renderPageItems()}
        {currentPage !== pageNumbers && (
          <>
            <PageItem
              number={currentPage + 1}
              text=">"
              currentPage={currentPage}
              paginate={paginate}
            />
            <PageItem
              number={pageNumbers}
              text=">>"
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
