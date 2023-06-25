import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReadWindow from "./components/readview/ReadWindow";
import SeriesWindow from "./components/seriesview/SeriesWindow";
import MainWindow from "./components/mainview/MainWindow";
import "./App.css";

const App = () => {
  document.title = "Reader";
  return (
    <Router>
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
