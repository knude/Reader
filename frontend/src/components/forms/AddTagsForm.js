import imageService from "../../services/imageService";
import Form from "./Form";

const AddTagsForm = ({ series, setSeries, onClose }) => {
  const fields = [{ name: "tagsInput", type: "text", placeholder: "Tags" }];

  const handleSubmit = async (formData) => {
    const { tagsInput } = formData;
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag); // Remove empty tags

    if (!tags.length) {
      return;
    }

    console.log("Adding tags:", formData);
    const updatedTags = [
      ...new Set([...series.tags.map((tag) => tag.toLowerCase()), ...tags]),
    ];

    const response = await imageService.updateSeries(
      series.abbreviation,
      series.name,
      series.image,
      updatedTags
    );
    console.log("Response:", response);

    console.log("Updated tags:", updatedTags);
    series.tags = updatedTags;

    onClose();
  };

  return (
    <div>
      <span>Add Tags</span>
      <div className="description">Separate tags with commas</div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Add" />
    </div>
  );
};

export default AddTagsForm;
