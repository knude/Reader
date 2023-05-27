import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./ReadWindow.css";
import NavigationBar from "./NavigationBar";
import DisplayWindow from "./DisplayWindow";

const ReadWindow = () => {
  return (
    <div className="read-window">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/:series/:chapter/:page" element={<DisplayWindow />} />
        </Routes>
      </Router>
    </div>
  );
};

export default ReadWindow;
