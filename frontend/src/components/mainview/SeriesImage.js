import "./SeriesImage.css";

const SeriesImage = ({ alt, url, handleClick }) => {
  return (
    <img
      className="series-image"
      src={url}
      alt={alt}
      onClick={handleClick}
    ></img>
  );
};

export default SeriesImage;
