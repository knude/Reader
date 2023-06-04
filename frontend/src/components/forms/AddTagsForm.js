import imageService from "../../services/imageService";
import Form from "./Form";

const AddTagsForm = ({ series, onClose }) => {
  const fields = [{ name: "tagsInput", type: "text", placeholder: "Tags" }];

  const handleSubmit = async (formData) => {
    const { tagsInput } = formData;
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag);

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
      series.description,
      series.image,
      updatedTags
    );
    series.tags = updatedTags;

    onClose();
  };

  return (
    <>
      <span>Add Tags</span>
      <div className="description">Separate tags with commas</div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Add" />
    </>
  );
};

export default AddTagsForm;
