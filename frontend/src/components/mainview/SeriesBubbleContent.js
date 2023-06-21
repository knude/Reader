import "./SeriesBubbleContent.css";
import Tags from "../common/Tags";

const SeriesBubbleContent = ({ name, tags, description, location }) => {
  return (
    <div className="series-bubble-content">
      <div className="series-bubble-title">
        <a href={location}>{name}</a>
      </div>

      <Tags tags={tags} />

      {description && (
        <p className="series-bubble-description">{description}</p>
      )}
    </div>
  );
};

export default SeriesBubbleContent;
