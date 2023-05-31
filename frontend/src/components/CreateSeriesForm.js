import imageService from "../services/imageService";
import Form from "./Form";
import "./Header.css";
import "./Button.css";

const CreateSeriesForm = ({ onClose }) => {
  const fields = [
    { name: "name", type: "text", placeholder: "Series Name" },
    { name: "id", type: "text", placeholder: "Series ID" },
    {
      name: "imageInput",
      type: "file",
      placeholder: "",
      accept: "image/png, image/gif, image/jpeg",
    },
  ];

  const handleSubmit = (formData) => {
    console.log("Creating series:", formData);

    const name = formData.name;
    const id = formData.id;
    const imageInput = formData.imageInput[0];

    if (!name || !id || !imageInput) {
      return;
    }
    imageService.createSeries(id, name, imageInput);

    onClose();
  };

  return (
    <>
      <div>Create Series</div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Create" />
    </>
  );
};

export default CreateSeriesForm;
