import { useState, useEffect } from "react";
import imageService from "../../services/imageService";
import Form from "./Form";

const CreateChapterForm = ({ series }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const fields = [
    { name: "chapter", type: "number", placeholder: "Chapter" },
    { name: "title", type: "text", placeholder: "Title" },
    { name: "files", type: "file", placeholder: "", multiple: true },
  ];

  const latestChapterNumber = series.chapters.length;

  const error = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  console.log("series", series.chapters);

  const handleSubmit = (formData) => {
    const { files, title, chapter } = formData;
    const seriesId = series.abbreviation;
    if (!files || !seriesId || !chapter) return;

    if (chapter <= latestChapterNumber && title) {
      error("You can't add a title to an existing chapter");
      return;
    }

    if (chapter > latestChapterNumber + 1 || chapter < 1) {
      error("The number must be the next chapter or an existing one");
      return;
    }

    console.log("Uploading chapter", formData);
    imageService.createMultiple(seriesId, chapter, title, files);
  };

  return (
    <>
      <span>Upload Chapters</span>
      <div className="description">
        {errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <div>
            Upload a new chapter or additional pages to existing chapters
          </div>
        )}
      </div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Upload" />
    </>
  );
};

export default CreateChapterForm;
