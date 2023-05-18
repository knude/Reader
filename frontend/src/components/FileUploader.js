import { useState } from "react";
import imageService from "../services/imageService";

import "./FileUploader.css";

const FileUploader = () => {
  const [fileValues, setFileValues] = useState({
    files: [],
    series: "",
    chapter: "",
    locked: false,
  });

  const [tempFiles, setTempFiles] = useState(null);

  console.log(fileValues.files);

  const handleFileChanges = (event) => {
    if (event.target.id === "file") {
      const selectedFiles = Array.from(event.target.files);
      setTempFiles(selectedFiles);
    } else {
      setFileValues((prevValues) => ({
        ...prevValues,
        [event.target.id]: event.target.value,
      }));
    }
  };

  const handleAddImage = () => {
    if (!tempFiles || fileValues.series === "" || fileValues.chapter === "")
      return;

    setFileValues((prevValues) => ({
      ...prevValues,
      files: [...prevValues.files, ...tempFiles],
      locked: true,
    }));

    setTempFiles(null);
  };

  const handleReset = () => {
    setFileValues({
      files: [],
      series: "",
      chapter: "",
      locked: false,
    });
    setTempFiles(null);
  };

  const handleFileUpload = () => {
    const { files, series, chapter } = fileValues;
    if (files.length === 0 || !series || !chapter) return;

    imageService.createMultiple(series, `chapter-${chapter}`, files);
  };

  return (
    <div className="file-uploader">
      <p>Upload Chapters</p>
      <div>
        Series:{" "}
        <input
          type="text"
          id="series"
          value={fileValues.series}
          onChange={handleFileChanges}
          disabled={fileValues.locked}
        />
      </div>
      <div>
        Chapter:{" "}
        <input
          type="number"
          id="chapter"
          value={fileValues.chapter}
          onChange={handleFileChanges}
          disabled={fileValues.locked}
        />
      </div>
      <div>
        <input type="file" id="file" onChange={handleFileChanges} multiple />
      </div>
      <div className="button-row">
        <div>
          <button onClick={handleAddImage}>Add</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div>
          <button onClick={handleFileUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
