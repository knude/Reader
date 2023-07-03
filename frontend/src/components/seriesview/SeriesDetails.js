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
import EditSeriesForm from "../forms/EditSeriesForm";
import "./SeriesDetails.css";

const SeriesDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { series } = useSelector((state) => state.seriesViewSeries) || {};
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const { name, image, description, tags } = series;

  const closeTagPopup = () => setIsTagPopupOpen(false);
  const closeEditPopup = () => setIsEditPopupOpen(false);

  return (
    <div className="series-details-container">
      <div className="series-details">
        <SeriesDetailsImage src={image} alt={name} />
        <div className="series-details-content">
          <SeriesTitle
            title={name}
            openPopup={() => setIsEditPopupOpen(true)}
          />
          {isEditPopupOpen && (
            <Popup isOpen={isEditPopupOpen} onClose={closeEditPopup}>
              <EditSeriesForm onClose={closeEditPopup} />
            </Popup>
          )}

          <Tags tags={tags}>
            {user && user.id === series.user && (
              <PlusButton onClick={() => setIsTagPopupOpen(true)} />
            )}
          </Tags>
          {isTagPopupOpen && (
            <Popup isOpen={isTagPopupOpen} onClose={closeTagPopup}>
              <AddTagsForm onClose={closeTagPopup} />
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
