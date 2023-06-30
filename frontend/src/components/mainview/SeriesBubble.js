import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSeries } from "../../reducers/series";

import imageService from "../../services/image";

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
  user,
  handleTag,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const loggedUser = useSelector((state) => state.user).user;
  const isCreator = loggedUser ? user === loggedUser.id : false;
  const dispatch = useDispatch();

  const handleRemoveSeries = () => {
    setIsPopupOpen(true);
  };

  const cancelRemoveSeries = () => {
    setIsPopupOpen(false);
  };

  const confirmRemoveSeries = () => {
    console.log("Removing series:", name);

    imageService.removeSeries(abbreviation);
    dispatch(removeSeries(abbreviation));

    setIsPopupOpen(false);
  };

  return (
    <div className="series-bubble-wrapper">
      <div className="remove-button-parent">
        {isCreator && <RemoveButton onClick={handleRemoveSeries} />}
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
