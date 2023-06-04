import "./SeriesBubble.css";
import SeriesImage from "./SeriesImage";
import SeriesContent from "./SeriesContent";

const SeriesBubble = ({ name, image, tags, description, abbreviation }) => {
  const handleClick = () => {
    window.location.href = `/${abbreviation}`;
  };

  return (
    <div className="series-bubble-wrapper">
      <div className="series-bubble">
        <SeriesImage alt={name} url={image} handleClick={handleClick} />
        <SeriesContent
          name={name}
          tags={tags}
          description={description}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SeriesBubble;
