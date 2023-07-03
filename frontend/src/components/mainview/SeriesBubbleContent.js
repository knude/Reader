import "./SeriesBubbleContent.css";
import Tags from "../common/Tags";

const SeriesBubbleContent = ({
  name,
  tags,
  description,
  location,
  handleTag,
}) => {
  return (
    <div className="series-bubble-content">
      <h3 className="series-bubble-title">
        <a href={location}>{name}</a>
      </h3>

      <Tags tags={tags} handleTag={handleTag} />

      {description && (
        <p className="series-bubble-description">{description}</p>
      )}
    </div>
  );
};

export default SeriesBubbleContent;
