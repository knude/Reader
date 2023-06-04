import { useState } from "react";
import SeriesImage from "./SeriesImage";
import SeriesTitle from "./SeriesTitle";
import SeriesTags from "./SeriesTags";
import SeriesDescription from "./SeriesDescription";
import ChapterList from "./ChapterList";
import Popup from "../common/Popup";
import AddTagsForm from "../forms/AddTagsForm";
import "./SeriesDetails.css";

const SeriesDetails = ({ series, setSeries }) => {
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
        <SeriesImage src={image} alt={name} />
        <div className="series-details-content">
          <SeriesTitle title={name} />
          <SeriesTags tags={tags} openPopup={openPopup} />
          {isPopupOpen && (
            <Popup isOpen={isPopupOpen} onClose={closePopup}>
              <AddTagsForm
                series={series}
                setSeries={setSeries}
                onClose={closePopup}
              />
            </Popup>
          )}
          <SeriesDescription description={description} />
        </div>
      </div>
      <ChapterList series={series} />
    </div>
  );
};

export default SeriesDetails;
