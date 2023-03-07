import { useState } from "react";
import "./NavigationBar.css";
import FileUploader from "./FileUploader";

const NavigationBar = ({
  setImageURL,
  handleFileUpload,
  handleFileChanges,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setImageURL(input);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <div className="navigation-bar">
        <h1>Reader</h1>
        <FileUploader
          handleFileChanges={handleFileChanges}
          handleFileUpload={handleFileUpload}
        />
        {/* <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="link">Image link:</label>
          </div>
          <div>
            <input type="url" id="link" name="link" onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form> */}
      </div>
    </>
  );
};

export default NavigationBar;
