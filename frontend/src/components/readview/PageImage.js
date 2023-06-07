import "./PageImage.css";

const PageImage = ({ alt, url }) => {
  return (
    <div onMouseMove={() => console.log("test")}>
      <img className="page-image" src={url} alt={alt}></img>
    </div>
  );
};

export default PageImage;
