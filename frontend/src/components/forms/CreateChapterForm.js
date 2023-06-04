import { useState, useEffect } from "react";
import imageService from "../../services/imageService";
import Form from "./Form";

const CreateChapterForm = ({ series, onClose }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const fields = [
    { name: "chapter", type: "number", placeholder: "Chapter", min: 1 },
    { name: "title", type: "text", placeholder: "Title" },
    { name: "files", type: "file", placeholder: "", multiple: true },
  ];

  const error = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleSubmit = async (formData) => {
    let { files, title, chapter } = formData;
    const seriesId = series.abbreviation;
    const chapterNumbers = series.chapters.map((chapter) => chapter.number);
    const latestChapter = chapterNumbers[0];

    if (!files || !seriesId || !chapter) return;

    if (chapterNumbers.includes(Number(chapter)) && title) {
      error("You can't add a title to an existing chapter");
      return;
    }

    if (chapter > latestChapter + 1 || chapter < 1) {
      error(
        "The number must be either the next chapter, a missing chapter, or an existing one"
      );
      return;
    }

    if (!chapterNumbers.includes(Number(chapter))) {
      await imageService.createMultiple(seriesId, chapter, title, files);

      const newChapter = { number: chapter, title };
      const insertIndex = series.chapters.findIndex(
        (chap) => chap.number < chapter
      );

      if (insertIndex !== -1) {
        series.chapters.splice(insertIndex, 0, newChapter);
      } else {
        series.chapters.push(newChapter);
      }
    }

    onClose();
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
