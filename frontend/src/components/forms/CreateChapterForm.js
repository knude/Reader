import imageService from "../../services/imageService";
import Form from "./Form";

const CreateChapterForm = () => {
  const fields = [
    { name: "series", type: "text", placeholder: "Series" },
    { name: "chapter", type: "number", placeholder: "Chapter" },
    { name: "files", type: "file", placeholder: "", multiple: true },
  ];

  const handleSubmit = (formData) => {
    const { files, series, chapter } = formData;
    if (!files || !series || !chapter) return;
    console.log("Uploading chapter", formData);
    imageService.createMultiple(series, chapter, files);
  };

  return (
    <>
      <span>Upload Chapters</span>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Upload" />
    </>
  );
};

export default CreateChapterForm;
