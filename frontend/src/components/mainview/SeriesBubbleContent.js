import "./SeriesBubbleContent.css";
import Tags from "../common/Tags";

const SeriesBubbleContent = ({
  name,
  tags,
  description,
  location,
  handleTag,
  creatorName,
}) => {
  return (
    <div className="series-bubble-content">
      <h3 className="series-bubble-title">
        <a href={location}>{name}</a>{" "}
        <span className="creator-name">{creatorName}</span>
      </h3>

      <Tags tags={tags} handleTag={handleTag} />

      {description && (
        <p title={description} className="series-bubble-description">
          {description}
        </p>
      )}
    </div>
  );
};

export default SeriesBubbleContent;
