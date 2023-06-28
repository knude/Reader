import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import imageService from "./services/image";
import ReadWindow from "./components/readview/ReadWindow";
import SeriesWindow from "./components/seriesview/SeriesWindow";
import MainWindow from "./components/mainview/MainWindow";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

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
      <Routes>
        <Route
          path="/"
          element={<MainWindow title="Browse" user={user} setUser={setUser} />}
        />
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
