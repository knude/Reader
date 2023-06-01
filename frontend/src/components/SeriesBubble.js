import "./SeriesBubble.css";

const SeriesBubble = ({ name, abbreviation, image }) => {
  const handleClick = () => {
    window.location.href = `/${abbreviation}`;
  };

  return (
    <div
      className="series-bubble"
      style={{ backgroundImage: `url(${image})` }}
      onClick={handleClick}
    >
      <div className="series-title">{name}</div>
    </div>
  );
};

export default SeriesBubble;
