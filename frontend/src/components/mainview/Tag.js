import "./Tag.css";

const Tag = ({ name, handleClick }) => {
  return (
    <div className="tag" onClick={handleClick}>
      {name}
    </div>
  );
};

export default Tag;
