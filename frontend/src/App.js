import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import imageService from "./services/image";
import Header from "./components/common/Header";
import ReadWindow from "./components/readview/ReadWindow";
import SeriesWindow from "./components/seriesview/SeriesWindow";
import MainWindow from "./components/mainview/MainWindow";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    imageService.getAll().then((series) => {
      const newSeries = series.map((seriesObj, index) => ({
        ...seriesObj,
        key: index,
      }));
      setSeries(newSeries);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      imageService.setToken(user.token);
    }
  }, []);

  document.title = "Reader";
  return (
    <Router>
      <Header user={user} series={series} setSeries={setSeries} />
      <Routes>
        <Route
          path="/"
          element={
            <MainWindow
              series={series}
              setSeries={setSeries}
              title="Browse"
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="/:series/:chapter/:page" element={<ReadWindow />} />
        <Route path="/:series" element={<SeriesWindow />} />
        <Route
          path="/latest"
          element={
            <MainWindow
              series={series}
              setSeries={setSeries}
              title="Latest Updates"
              latest={true}
              user={user}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
