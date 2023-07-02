import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChapter } from "../../reducers/seriesViewSeries";
import imageService from "../../services/image";
import Form from "./Form";

const CreateChapterForm = ({ onClose }) => {
  const { series } = useSelector((state) => state.seriesViewSeries);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

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
    const chapterNumbers = series.chapters.map((chapter) =>
      Number(chapter.number)
    );
    const latestChapter = Number(chapterNumbers[chapterNumbers.length - 1]);
    chapter = Number(chapter);

    if (!files || !seriesId || !chapter) return;

    if (chapterNumbers.length === 0 && chapter !== 1) {
      error("The first chapter must be 1");
      return;
    }

    if (chapterNumbers.includes(chapter)) {
      error("Chapter already exists");
      return;
    } else if (chapter > latestChapter + 1) {
      error("The number must be either the next chapter or a missing chapter");
      return;
    }

    await imageService.createChapter(seriesId, chapter, title, files);

    const newChapter = { number: chapter, title };
    const insertIndex = series.chapters.findIndex(
      (chap) => chap.number < chapter
    );

    if (insertIndex !== -1) {
      dispatch(addChapter(newChapter));
    } else {
      dispatch(addChapter(newChapter));
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
          <div>Upload a new chapter</div>
        )}
      </div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Upload" />
    </>
  );
};

export default CreateChapterForm;
