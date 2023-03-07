import "./FileUploader.css";

const FileUploader = ({ handleFileUpload, handleFileChanges }) => {
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
