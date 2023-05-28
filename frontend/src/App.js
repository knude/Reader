import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReadWindow from "./components/ReadWindow";
import MainWindow from "./components/MainWindow";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:series/:chapter/:page" element={<ReadWindow />} />
        <Route path="/" element={<MainWindow />} />
      </Routes>
    </Router>
  );
};

export default App;
