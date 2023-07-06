import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSeries } from "../../reducers/series";
import seriesService from "../../services/series";
import Form from "./Form";

const CreateSeriesForm = ({ onClose }) => {
  const { series } = useSelector((state) => state.series);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const fields = [
    { name: "name", type: "text", placeholder: "Series Name" },
    { name: "id", type: "text", placeholder: "Series ID" },
    { name: "description", type: "text", placeholder: "Description" },
    { name: "tagsInput", type: "text", placeholder: "Tags" },
    {
      name: "imageInput",
      type: "file",
      placeholder: "",
      accept: "image/png, image/jpeg",
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

    if (!name || !id || !image || id === "latest") {
      error("Input at least a name, ID, and a cover image");
      return;
    }

    if (series.some((series) => series.abbreviation === id)) {
      error("Series ID already exists");
      return;
    }

    console.log("Creating series:", formData);

    const filteredTags = [
      ...new Set([...tags.map((tag) => tag.toLowerCase()), ...tags]),
    ];
    try {
      const newSeries = await seriesService.createSeries(
        id,
        name,
        description,
        image,
        filteredTags
      );
      newSeries.key = newSeries.abbreviation;
      newSeries.image = `/images/${newSeries.abbreviation}/${newSeries.image}`;
      dispatch(addSeries(newSeries));
      onClose();
    } catch (error) {
      console.log("Error creating series:", error);
      error("Error creating series");
    }
  };

  return (
    <>
      <h2>Create Series</h2>
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
