import imageService from "../../services/image";
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

    await imageService.updateSeries(
      series.abbreviation,
      null,
      null,
      null,
      updatedTags,
      null
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
