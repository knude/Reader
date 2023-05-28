import "./SeriesBubble.css";

const SeriesBubble = ({ title, backgroundImage }) => {
  return (
    <div
      className="series-bubble"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="series-title">{title}</div>
    </div>
  );
};

export default SeriesBubble;
