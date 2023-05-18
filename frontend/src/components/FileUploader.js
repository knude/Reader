import { useState } from "react";
import imageService from "../services/imageService";

import "./FileUploader.css";

const FileUploader = () => {
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
    if (!file || !series || !chapter) return;
    imageService.create(series, `chapter-${chapter}`, file);
  };

  return (
    <div className="file-uploader">
      <p>Upload Chapters</p>
      <div>
        Series: <input type="text" id="series" onChange={handleFileChanges} />
      </div>
      <div>
        Chapter:{" "}
        <input type="number" id="chapter" onChange={handleFileChanges} />
      </div>
      <div>
        <input type="file" id="file" onChange={handleFileChanges} />
      </div>
      <div>
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <p></p>
    </div>
  );
};

export default FileUploader;
