import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReadWindow from "./components/ReadWindow";
import SeriesWindow from "./components/SeriesWindow";
import MainWindow from "./components/MainWindow";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWindow />} />
        <Route path="/:series" element={<SeriesWindow />} />
        <Route path="/:series/:chapter/:page" element={<ReadWindow />} />
      </Routes>
    </Router>
  );
};

export default App;
