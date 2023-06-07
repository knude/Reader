import Tag from "./Tag";
import "./Tags.css";

const Tags = ({ tags, openPopup, children }) => {
  return (
    <div className="tags">
      {tags && tags.map((tag) => <Tag key={tag} name={tag} />)}
      {children}
    </div>
  );
};

export default Tags;
