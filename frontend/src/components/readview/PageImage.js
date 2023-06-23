import "./PageImage.css";

const PageImage = ({ alt, url }) => {
  return <img className="page-image" src={url} alt={alt}></img>;
};

export default PageImage;
