import "./Image.css";

const Image = ({ alt, url, handleIncrement }) => {
  const handleImageClick = (event) => {
    const clickLocation =
      event.clientX - event.target.getBoundingClientRect().left;
    const imageWidth = event.target.width;
    const clickPercentage = clickLocation / imageWidth;
    const increment = clickPercentage < 0.5 ? -1 : 1;
    handleIncrement(increment);
  };
  return (
    <div>
      <img
        className="page-image"
        src={url}
        alt={alt}
        onClick={handleImageClick}
      ></img>
    </div>
  );
};

export default Image;
