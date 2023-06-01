import "./SeriesBubble.css";

const SeriesBubble = ({ name, image }) => {
  return (
    <div className="series-bubble" style={{ backgroundImage: `url(${image})` }}>
      <div className="series-title">{name}</div>
    </div>
  );
};

export default SeriesBubble;
