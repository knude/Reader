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
      <a href="/" className="logo">
        Rr
      </a>
      <a href="/">
        <Button title="Browse" />
      </a>
      <a href="/latest">
        <Button title="Latest" />
      </a>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={onClose}>
          {form}
        </Popup>
      )}
      <Button
        title={buttonLabel}
        onClick={handleButtonClick}
        style={{ position: "absolute", right: "15px" }}
      />
    </div>
  );
};

export default Header;
