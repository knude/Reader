import { useState } from "react";
import Tag from "../common/Tag";
import PlusButton from "../common/PlusButton";
import ChapterList from "./ChapterList";
import Popup from "../common/Popup";
import "./SeriesDetails.css";
import AddTagsForm from "../forms/AddTagsForm";

const SeriesDetails = ({ series, setSeries }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    console.log("openPopup");
    setIsPopupOpen(true);
  };

  let { name, image, description, tags } = series;

  return (
    <div className="series-details-container">
      <div className="series-details">
        <img className="series-details-image" src={image} alt={name} />
        <div className="series-details-content">
          <div className="series-details-title">{name}</div>
          <div className="series-details-tags">
            {tags && tags.map((tag) => <Tag key={tag} name={tag} />)}
            <PlusButton handleClick={openPopup} />
            {isPopupOpen && (
              <Popup isOpen={isPopupOpen} onClose={closePopup}>
                <AddTagsForm
                  series={series}
                  setSeries={setSeries}
                  onClose={closePopup}
                />
              </Popup>
            )}
          </div>
          <div className="series-details-description">{description}</div>
        </div>
      </div>
      <ChapterList series={series} />
    </div>
  );
};

export default SeriesDetails;
