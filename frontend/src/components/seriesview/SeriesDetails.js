import { useState } from "react";
import { useSelector } from "react-redux";
import SeriesDetailsImage from "./SeriesDetailsImage";
import SeriesTitle from "./SeriesTitle";
import Tags from "../common/Tags";
import SeriesDetailsDescription from "./SeriesDetailsDescription";
import ChapterList from "./ChapterList";
import Popup from "../common/Popup";
import PlusButton from "../common/PlusButton";
import AddTagsForm from "../forms/AddTagsForm";
import "./SeriesDetails.css";

const SeriesDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { series } = useSelector((state) => state.seriesViewSeries) || {};
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const { name, image, description, tags } = series;

  return (
    <div className="series-details-container">
      <div className="series-details">
        <SeriesDetailsImage src={image} alt={name} />
        <div className="series-details-content">
          <SeriesTitle title={name} />
          <Tags tags={tags}>
            {user && user.id === series.user && (
              <PlusButton onClick={openPopup} />
            )}
          </Tags>
          {isPopupOpen && (
            <Popup isOpen={isPopupOpen} onClose={closePopup}>
              <AddTagsForm onClose={closePopup} />
            </Popup>
          )}
          <SeriesDetailsDescription description={description} />
        </div>
      </div>
      <ChapterList />
    </div>
  );
};

export default SeriesDetails;
