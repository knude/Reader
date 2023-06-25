import "./Tag.css";

const Tag = ({ name, handleTag }) => {
  return (
    <div className="tag" onClick={() => handleTag(name)}>
      {name}
    </div>
  );
};

export default Tag;
