import "./Popup.css";

const Popup = ({ isOpen, onClose, children }) => {
  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
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
