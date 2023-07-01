import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logOut } from "./reducers/user.js";
import { setSeries } from "./reducers/series.js";
import { setFilteredSeries } from "./reducers/filteredSeries.js";
import jwtDecode from "jwt-decode";
import imageService from "./services/image";
import Header from "./components/common/Header";
import ReadWindow from "./components/readview/ReadWindow";
import SeriesWindow from "./components/seriesview/SeriesWindow";
import MainWindow from "./components/mainview/MainWindow";
import "./App.css";

const App = () => {
  const { series } = useSelector((state) => state.series);
  const dispatch = useDispatch();

  useEffect(() => {
    imageService.getAll().then((series) => {
      const newSeries = series.map((seriesObj, index) => ({
        ...seriesObj,
        key: index,
      }));
      dispatch(setSeries(newSeries));
      dispatch(setFilteredSeries(newSeries));
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      imageService.setToken(user.token);

      const tokenExpiration = jwtDecode(user.token).exp * 1000;
      const timeUntilExpiration = tokenExpiration - Date.now();

      if (timeUntilExpiration <= 0) {
        dispatch(logOut());
        window.localStorage.removeItem("loggedUser");
      } else {
        setTimeout(() => dispatch(logOut()), timeUntilExpiration);
      }
    }
  }, [dispatch]);

  document.title = "Reader";
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainWindow title="Browse" />} />
        <Route path="/:series/:chapter/:page" element={<ReadWindow />} />
        <Route path="/:series" element={<SeriesWindow />} />
        <Route
          path="/latest"
          element={<MainWindow title="Latest Updates" latest={true} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
