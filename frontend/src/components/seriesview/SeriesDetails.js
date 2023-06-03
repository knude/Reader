import Tag from "../mainview/Tag";
import ChapterList from "./ChapterList";
import "./SeriesDetails.css";

const SeriesDetails = ({ series }) => {
  const { name, image, description, tags, chapters } = series;
  console.log("series:", series);

  return (
    <div className="series-details-container">
      <div className="series-details">
        <img className="series-details-image" src={image} alt={name} />
        <div className="series-details-content">
          <div className="series-details-title">{name}</div>
          <div className="series-details-tags">
            {tags && tags.map((tag) => <Tag key={tag} name={tag} />)}
          </div>
          <div className="series-details-description">{description}</div>
        </div>
      </div>
      <ChapterList series={series} />
    </div>
  );
};

export default SeriesDetails;
