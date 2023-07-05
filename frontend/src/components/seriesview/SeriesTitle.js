import { useSelector } from "react-redux";
import "./SeriesTitle.css";

const SeriesTitle = ({ title, openPopup }) => {
  const { user } = useSelector((state) => state.user);
  const { series } = useSelector((state) => state.seriesViewSeries);
  const isPermitted =
    (user && series && user.id === series.user) || (user && user.admin);

  return (
    <h1 className="series-details-title-container">
      <span className="series-details-title" onClick={openPopup}>
        {title}
      </span>
      {isPermitted && (
        <span className="edit" onClick={openPopup}>
          ✎
        </span>
      )}
    </h1>
  );
};

export default SeriesTitle;
