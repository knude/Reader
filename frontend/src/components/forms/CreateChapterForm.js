import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChapter } from "../../reducers/seriesViewSeries";
import seriesService from "../../services/series";
import Form from "./Form";

const CreateChapterForm = ({ onClose }) => {
  const { series } = useSelector((state) => state.seriesViewSeries);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const fields = [
    { name: "chapter", type: "number", placeholder: "Chapter", min: 1 },
    { name: "title", type: "text", placeholder: "Title" },
    { name: "files", type: "file", accept: ".png,.jpg", multiple: true },
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
    const chapterNumbers = series.chapters.map((chapter) =>
      Number(chapter.number)
    );
    chapter = Number(chapter);

    if (!files || !seriesId || !chapter) return;

    if (chapterNumbers.includes(chapter)) {
      error("Chapter already exists");
      return;
    } else if (chapter < 1 || chapter > 10000) {
      error("Give a valid chapter number");
      return;
    }

    await seriesService.createChapter(seriesId, chapter, title, files);
    const newChapter = { number: chapter, title };
    dispatch(addChapter(newChapter));
    onClose();
  };

  return (
    <>
      <h2>Upload Chapters</h2>
      <div className="description">
        {errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <div>Upload a new chapter</div>
        )}
      </div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Upload" />
    </>
  );
};

export default CreateChapterForm;
