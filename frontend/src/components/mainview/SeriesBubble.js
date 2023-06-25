import { useState } from "react";

import imageServices from "../../services/imageService";

import Popup from "../common/Popup";
import SeriesBubbleImage from "./SeriesBubbleImage";
import SeriesBubbleContent from "./SeriesBubbleContent";
import RemoveButton from "../common/RemoveButton";
import Button from "../common/Button";

import "./SeriesBubble.css";

const SeriesBubble = ({
  name,
  image,
  tags,
  description,
  abbreviation,
  seriesList,
  setSeries,
  handleTag,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRemoveSeries = () => {
    setIsPopupOpen(true);
  };

  const cancelRemoveSeries = () => {
    setIsPopupOpen(false);
  };

  const confirmRemoveSeries = () => {
    console.log("Removing series:", name);

    imageServices.removeSeries(abbreviation);
    const newSeriesList = seriesList.filter(
      (s) => s.abbreviation !== abbreviation
    );
    setSeries(newSeriesList);

    setIsPopupOpen(false);
  };

  return (
    <div className="series-bubble-wrapper">
      <div className="remove-button-parent">
        <RemoveButton onClick={handleRemoveSeries} />
        <div className="series-bubble">
          <SeriesBubbleImage
            alt={name}
            url={image}
            location={`/${abbreviation}`}
          />
          <SeriesBubbleContent
            name={name}
            tags={tags}
            description={description}
            location={`/${abbreviation}`}
            handleTag={handleTag}
          />
        </div>
      </div>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={cancelRemoveSeries}>
          <span>Remove Series {name}?</span>
          <div className="popup-remove-button-container">
            <Button title="Remove" onClick={confirmRemoveSeries} />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default SeriesBubble;
