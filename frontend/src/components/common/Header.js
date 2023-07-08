import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleHeader } from "../../reducers/header";
import Button from "./Button";
import Popup from "./Popup";
import UserForm from "../forms/UserForm";
import AvatarCircle from "./AvatarCircle";
import CreateSeriesForm from "../forms/CreateSeriesForm";
import CreateChapterForm from "../forms/CreateChapterForm";
import "./Header.css";
import "./Button.css";
import arrow from "../../assets/arrow.png";

const Header = () => {
  const [isUserFormOpen, setUserFormOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { hidden } = useSelector((state) => state.header);
  const { user } = useSelector((state) => state.user);
  const seriesObj = useSelector((state) => state.seriesViewSeries.series);
  const isPermitted =
    (user && seriesObj && user.id === seriesObj.user) ||
    (user && !seriesObj) ||
    (user && user.admin);
  const dispatch = useDispatch();

  const buttonLabel = seriesObj ? "Add Chapter" : "Create Series";

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const form = seriesObj ? (
    <CreateChapterForm series={seriesObj} onClose={handleClosePopup} />
  ) : (
    <CreateSeriesForm onClose={handleClosePopup} />
  );

  return (
    <>
      <div className={`header ${hidden ? "hidden" : ""}`}>
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
          {isPermitted && (
            <>
              <Button title={buttonLabel} onClick={handleButtonClick} />
              {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                  {form}
                </Popup>
              )}
            </>
          )}
          <AvatarCircle onClick={() => setUserFormOpen(true)} />
          {isUserFormOpen && (
            <Popup
              isOpen={isUserFormOpen}
              onClose={() => setUserFormOpen(false)}
            >
              <UserForm />
            </Popup>
          )}
        </div>
        {!hidden && (
          <img
            src={arrow}
            alt="Hide Header"
            className="hide-arrow"
            onClick={() => dispatch(toggleHeader())}
          />
        )}
      </div>
      {hidden && (
        <div className="show-header" onClick={() => dispatch(toggleHeader())}>
          <img src={arrow} alt="Show Header" className="show-arrow" />
        </div>
      )}
    </>
  );
};

export default Header;
