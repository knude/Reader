import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeriesViewSeries } from "../../reducers/seriesViewSeries";
import seriesService from "../../services/series";
import Form from "./Form";

const EditSeriesForm = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { series } = useSelector((state) => state.seriesViewSeries) || {};
  const dispatch = useDispatch();

  const fields = [
    { name: "name", type: "text", placeholder: "Name" },
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
    const { name, description, imageInput, tagsInput } = formData;
    const image = imageInput?.[0];
    const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];

    if (!name && !description && !image && !tagsInput) {
      error("No changes made");
      return;
    }

    console.log("Changing series details:", formData);
    const filteredTags = [
      ...new Set([...tags.map((tag) => tag.toLowerCase()), ...tags]),
    ];
    try {
      const updatedSeries = await seriesService.updateSeries(
        series.abbreviation,
        name,
        description,
        image,
        filteredTags,
        null
      );
      updatedSeries.image = `/images/${updatedSeries.abbreviation}/${updatedSeries.image}`;
      dispatch(setSeriesViewSeries(updatedSeries));
      onClose();
    } catch (error) {
      console.log(error);
      error("Error changing series details");
    }
  };

  return (
    <>
      <h2>Edit Series</h2>
      <div className="description">
        {errorMessage ? (
          <div className="error">{errorMessage}</div>
        ) : (
          <div>Leave fields blank to keep the current value</div>
        )}
      </div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Edit" />
    </>
  );
};

export default EditSeriesForm;
