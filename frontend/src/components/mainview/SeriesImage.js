import "./SeriesImage.css";

const SeriesImage = ({ alt, url, handleClick }) => {
  return (
    <div onClick={handleClick}>
      <img className="series-image" src={url} alt={alt}></img>
    </div>
  );
};

export default SeriesImage;
