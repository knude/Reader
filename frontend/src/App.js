import { useState } from "react";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import DisplayWindow from "./components/DisplayWindow";

import imageService from "./services/imageService";

const App = () => {
  const [imageURL, setImageURL] = useState("");
  const [fileValues, setFileValues] = useState({
    file: null,
    series: "",
    chapter: "",
  });

  const handleFileChanges = (event) => {
    setFileValues((prevValues) => {
      const value =
        event.target.id === "file" ? event.target.files[0] : event.target.value;
      return { ...prevValues, [event.target.id]: value };
    });
  };

  const handleFileUpload = () => {
    const { file, series, chapter } = fileValues;
    console.log(fileValues);
    if (!file || !series || !chapter) return;
    imageService.create(series, chapter, file);
  };
  console.log(fileValues);

  return (
    <div className="page">
      <NavigationBar
        setImageURL={setImageURL}
        handleFileChanges={handleFileChanges}
        handleFileUpload={handleFileUpload}
      />
      <DisplayWindow imageURL={imageURL} />
    </div>
  );
};

export default App;
