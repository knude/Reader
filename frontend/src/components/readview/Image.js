import "./Image.css";

const Image = ({ alt, url }) => {
  return (
    <div>
      <img className="page-image" src={url} alt={alt}></img>
    </div>
  );
};

export default Image;
