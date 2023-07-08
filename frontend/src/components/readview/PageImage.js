import LoadingAnimation from "../common/LoadingAnimation";
import "./PageImage.css";

const PageImage = ({ alt, url }) => {
  if (!url) return <LoadingAnimation backgroundColor={"black"} />;
  return <img className="page-image" src={url} alt={alt}></img>;
};

export default PageImage;
