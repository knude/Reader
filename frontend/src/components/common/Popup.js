import { useEffect } from "react";
import "./Popup.css";

const Popup = ({ isOpen, onClose, children }) => {
  const handleClickOutside = (e) => {
    if (e.target.className === "popup open") onClose();
  };

  const handleEscKey = (e) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div
      className={`popup ${isOpen ? "open" : ""}`}
      onClick={handleClickOutside}
    >
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="popup-form">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
