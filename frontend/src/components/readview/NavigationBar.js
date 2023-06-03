import "./NavigationBar.css";

const NavigationBar = ({ title, handleTitleClick }) => {
  return (
    <>
      <div className="navigation-bar">
        <div className="navigation-bar-title" onClick={handleTitleClick}>
          {title}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
