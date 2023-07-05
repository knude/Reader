import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSeries } from "../../reducers/series";
import { setCurrentPage } from "../../reducers/search";
import seriesService from "../../services/series";
import userService from "../../services/user";
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
  const [creatorName, setCreatorName] = useState("");
  const loggedUser = useSelector((state) => state.user).user;
  const isPermitted = loggedUser
    ? user === loggedUser.id || loggedUser.admin
    : false;
  const dispatch = useDispatch();

  const handleRemoveSeries = () => setIsPopupOpen(true);
  const cancelRemoveSeries = () => setIsPopupOpen(false);

  const confirmRemoveSeries = () => {
    console.log("Removing series:", name);
    seriesService.removeSeries(abbreviation);
    dispatch(removeSeries(abbreviation));
    setIsPopupOpen(false);
  };

  const clickTag = (tag) => {
    dispatch(setCurrentPage(1));
    handleTag(tag);
  };

  useEffect(() => {
    if (user) {
      userService
        .getUser(user)
        .then((response) => setCreatorName(response.username));
    }
  }, [user]);

  return (
    <div className="series-bubble-wrapper">
      <div className="remove-button-parent">
        {isPermitted && <RemoveButton onClick={handleRemoveSeries} />}
        <div className="series-bubble">
          <SeriesBubbleImage
            name={name}
            url={image}
            location={`/${abbreviation}`}
          />
          <SeriesBubbleContent
            name={name}
            tags={tags}
            description={description}
            location={`/${abbreviation}`}
            handleTag={clickTag}
            creatorName={creatorName}
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
