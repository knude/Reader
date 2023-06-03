import Button from "./Button";
import Popup from "./Popup";
import "./Header.css";
import "./Button.css";

const Header = ({ buttonLabel, isPopupOpen, setPopupOpen, onClose, form }) => {
  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const goLatest = () => {
    window.location.href = "/latest";
  };

  return (
    <div className="header">
      <div className="logo" onClick={goHome}>
        Rr
      </div>
      <Button title="Latest" onClick={goLatest} />
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
