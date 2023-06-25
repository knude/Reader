import Tag from "./Tag";
import "./Tags.css";

const Tags = ({ tags, children, handleTag }) => {
  return (
    <div className="tags">
      {tags &&
        tags.map((tag) => <Tag key={tag} name={tag} handleTag={handleTag} />)}
      {children}
    </div>
  );
};

export default Tags;
