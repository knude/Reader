import { useState, useRef } from "react";
import Button from "./Button";
import Popup from "./Popup";
import UserForm from "../forms/UserForm";
import AvatarCircle from "./AvatarCircle";
import CreateSeriesForm from "../forms/CreateSeriesForm";
import CreateChapterForm from "../forms/CreateChapterForm";
import "./Header.css";
import "./Button.css";
import arrow from "../../assets/arrow.png";

const Header = ({ user, series, setSeries }) => {
  const [isUserFormOpen, setUserFormOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isHeaderHidden, setHeaderHidden] = useState(false);

  const params = window.location.pathname.split("/");
  const param = params.length === 2 ? params[1] : null;
  const seriesObj = series?.find((series) => series.abbreviation === param);
  const seriesId = seriesObj?.abbreviation;

  const buttonLabel = seriesObj ? "Add Chapter" : series ? "Create Series" : "";

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const form = seriesId ? (
    <CreateChapterForm series={seriesObj} onClose={handleClosePopup} />
  ) : (
    <CreateSeriesForm
      series={series}
      setSeries={setSeries}
      onClose={handleClosePopup}
    />
  );

  const conditions = [
    user && !seriesId,
    user && seriesObj && user.id === seriesObj.user,
  ];

  return (
    <>
      <div className={`header ${isHeaderHidden ? "hidden" : ""}`}>
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
          {conditions.map(
            (condition, index) =>
              condition && (
                <div key={index}>
                  <Button title={buttonLabel} onClick={handleButtonClick} />
                  {isPopupOpen && (
                    <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                      {form}
                    </Popup>
                  )}
                </div>
              )
          )}
          <AvatarCircle onClick={() => setUserFormOpen(true)} />
          {isUserFormOpen && (
            <Popup
              isOpen={isUserFormOpen}
              onClose={() => setUserFormOpen(false)}
            >
              <UserForm user={user} />
            </Popup>
          )}
        </div>
        {!isHeaderHidden && (
          <img
            src={arrow}
            alt="Hide Header"
            className="hide-arrow"
            onClick={() => setHeaderHidden(true)}
          />
        )}
      </div>
      {isHeaderHidden && (
        <div className="show-header" onClick={() => setHeaderHidden(false)}>
          <img src={arrow} alt="Show Header" className="show-arrow" />
        </div>
      )}
    </>
  );
};

export default Header;
