import Button from "./Button";
import Popup from "./Popup";
import "./Header.css";
import "./Button.css";

const Header = ({ buttonLabel, isPopupOpen, setPopupOpen, onClose, form }) => {
  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  return (
    <div className="header">
      <div className="title-container">
        <h1>Reader</h1>
      </div>
      <Button title={buttonLabel} onClick={handleButtonClick} />
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={onClose}>
          {form}
        </Popup>
      )}
    </div>
  );
};

export default Header;
