import "./LoadingAnimation.css";

const LoadingAnimation = ({ backgroundColor }) => {
  return (
    <div className="loading-container">
      <div
        className="loading-animation"
        style={{ borderTopColor: backgroundColor }}
      ></div>
    </div>
  );
};

export default LoadingAnimation;
