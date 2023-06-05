import "./SeriesBubble.css";
import SeriesImage from "./SeriesImage";
import SeriesContent from "./SeriesContent";

const SeriesBubble = ({ name, image, tags, description, abbreviation }) => {
  return (
    <div className="series-bubble-wrapper">
      <div className="series-bubble">
        <SeriesImage alt={name} url={image} location={`/${abbreviation}`} />
        <SeriesContent
          name={name}
          tags={tags}
          description={description}
          location={`/${abbreviation}`}
        />
      </div>
    </div>
  );
};

export default SeriesBubble;
