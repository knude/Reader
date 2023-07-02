import "./Tag.css";

const Tag = ({ name, handleTag }) => {
  handleTag =
    handleTag ||
    ((tag) => {
      window.location.href = `/?tag=${tag}`;
    });
  return (
    <div className="tag" onClick={() => handleTag(name)}>
      {name}
    </div>
  );
};

export default Tag;
