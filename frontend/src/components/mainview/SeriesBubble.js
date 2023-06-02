import "./SeriesBubble.css";
import Tag from "./Tag";
import SeriesImage from "./SeriesImage";
import SeriesContent from "./SeriesContent";

const SeriesBubble = ({ name, image, tags, description, abbreviation }) => {
  const handleClick = () => {
    window.location.href = `/${abbreviation}`;
  };

  // ternary add dummy data if not provided (for testing)
  tags = tags ? tags : ["Action", "Adventure", "Comedy", "Drama", "Fantasy"];
  description = description
    ? description
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
      " Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor." +
      " Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi." +
      " Dos quis mi. Nam elementum. Fusce fringilla sapien vitae augue. Morbi ac felis." +
      " Etiam feugiat lorem non metus. Vestibulum dapibus nunc ac augue." +
      " Curabitur vestibulum aliquam leo. Praesent egestas neque eu enim." +
      " In hac habitasse platea dictumst. Fusce a quam. Etiam ut purus mattis mauris sodales aliquam.";

  return (
    <div className="series-bubble-wrapper">
      <div className="series-bubble">
        <SeriesImage alt={name} url={image} handleClick={handleClick} />
        <SeriesContent
          name={name}
          tags={tags}
          description={description}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SeriesBubble;
