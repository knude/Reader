import "./SeriesImage.css";

const SeriesImage = ({ alt, url, location }) => {
  return (
    <a href={location}>
      <img className="series-image" src={url} alt={alt}></img>
    </a>
  );
};

export default SeriesImage;
