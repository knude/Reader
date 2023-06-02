import "./SeriesContent.css";
import Tag from "./Tag";

const SeriesContent = ({ name, tags, description, handleClick }) => {
  return (
    <div className="series-content">
      <div className="series-title" onClick={handleClick}>
        {name}
      </div>
      {tags && tags.length > 0 && (
        <div className="series-tags">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} handleClick={handleClick} />
          ))}
        </div>
      )}
      {description && <div className="series-description">{description}</div>}
    </div>
  );
};

export default SeriesContent;
