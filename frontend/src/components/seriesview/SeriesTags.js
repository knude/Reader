import PropTypes from "prop-types";
import Tag from "../common/Tag";
import PlusButton from "../common/PlusButton";
import "./SeriesTags.css";

const SeriesTags = ({ tags, openPopup }) => {
  return (
    <div className="series-details-tags">
      {tags && tags.map((tag) => <Tag key={tag} name={tag} />)}
      <PlusButton handleClick={openPopup} />
    </div>
  );
};

export default SeriesTags;
