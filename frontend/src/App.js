import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import DisplayWindow from "./components/DisplayWindow";

const App = () => {
  return (
    <div className="page">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/:series/:chapter/:page" element={<DisplayWindow />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
