import { useState } from "react";
import imageService from "../../services/image";
import Form from "./Form";

const CreateSeriesForm = ({ series, setSeries, onClose }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const fields = [
    { name: "name", type: "text", placeholder: "Series Name" },
    { name: "id", type: "text", placeholder: "Series ID" },
    { name: "description", type: "text", placeholder: "Description" },
    { name: "tagsInput", type: "text", placeholder: "Tags" },
    {
      name: "imageInput",
      type: "file",
      placeholder: "",
      accept: "image/png, image/gif, image/jpeg",
    },
  ];

  const error = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleSubmit = async (formData) => {
    const { name, id, description, imageInput, tagsInput } = formData;
    const image = imageInput?.[0];
    const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];

    if (!name || !id || !image) {
      return;
    }

    if (series.some((series) => series.abbreviation === id)) {
      error("Series ID already exists");
      return;
    }

    console.log("Creating series:", formData);
    imageService.createSeries(id, name, description, image, tags).then(() => {
      imageService.getAll().then((series) => {
        for (let i = 0; i < series.length; i++) {
          const seriesObj = series[i];
          seriesObj.key = i;
        }
        setSeries(series);
      });
    });

    onClose();
  };

  return (
    <>
      <span>Create Series</span>
      <div className="description">
        {errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <div>Separate tags with commas</div>
        )}
      </div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Create" />
    </>
  );
};

export default CreateSeriesForm;
