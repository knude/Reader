import imageService from "../services/imageService";
import Form from "./Form";
import "./FileUploader.css";

const FileUploader = () => {
  const fields = [
    { name: "series", type: "text", placeholder: "Series" },
    { name: "chapter", type: "number", placeholder: "Chapter" },
    { name: "files", type: "file", placeholder: "", multiple: true },
  ];

  const handleSubmit = (formData) => {
    const { files, series, chapter } = formData;
    if (files.length === 0 || !series || !chapter) return;
    imageService.createMultiple(series, chapter, files);
  };

  return (
    <div className="file-uploader">
      <p>Upload Chapters</p>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Upload" />
    </div>
  );
};

export default FileUploader;
