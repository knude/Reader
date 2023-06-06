import "./SeriesContent.css";
import Tag from "../common/Tag";

const SeriesContent = ({ name, tags, description, location, setSeries }) => {
  return (
    <div className="series-content">
      <a className="series-title" href={location}>
        {name}
      </a>
      {tags && tags.length > 0 && (
        <div className="series-tags">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      )}
      {description && <div className="series-description">{description}</div>}
    </div>
  );
};

export default SeriesContent;
