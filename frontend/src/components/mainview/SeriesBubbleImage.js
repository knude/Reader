import "./SeriesBubbleImage.css";

const SeriesBubbleImage = ({ name, url, location }) => {
  return (
    <a href={location}>
      <img className="series-image" src={url} alt={name}></img>
    </a>
  );
};

export default SeriesBubbleImage;
