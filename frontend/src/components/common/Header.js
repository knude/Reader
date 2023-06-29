import { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import UserForm from "../forms/UserForm";
import AvatarCircle from "./AvatarCircle";
import "./Header.css";
import "./Button.css";

const Header = ({
  buttonLabel,
  isPopupOpen,
  setPopupOpen,
  onClose,
  form,
  user,
}) => {
  const [isUserFormOpen, setUserFormOpen] = useState(false);

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  return (
    <div className="header">
      <div className="header-left">
        <a href="/" className="logo">
          Rr
        </a>
        <a href="/">
          <Button title="Browse" />
        </a>
        <a href="/latest">
          <Button title="Latest" />
        </a>
      </div>
      <div className="header-right">
        {user && (
          <>
            <Button title={buttonLabel} onClick={handleButtonClick} />
            {isPopupOpen && (
              <Popup isOpen={isPopupOpen} onClose={onClose}>
                {form}
              </Popup>
            )}
          </>
        )}
        <AvatarCircle onClick={() => setUserFormOpen(true)} />
        {isUserFormOpen && (
          <Popup isOpen={isUserFormOpen} onClose={() => setUserFormOpen(false)}>
            <UserForm user={user} />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Header;
