const PageItem = ({ number, text, currentPage, paginate }) => {
  return (
    <li key={text || number} className="page-item">
      <button
        onClick={() => paginate(number)}
        className={`page-link ${currentPage === number ? "active" : ""}`}
      >
        {text ? text : number}
      </button>
    </li>
  );
};

export default PageItem;
