import imageService from "../services/imageService";
import Form from "./Form";
import "./Header.css";
import "./Button.css";

const CreateSeriesForm = ({ setSeries, onClose }) => {
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

  const handleSubmit = async (formData) => {
    const name = formData.name;
    const id = formData.id;
    const imageInput = formData.imageInput ? formData.imageInput[0] : null;

    if (!name || !id || !imageInput) {
      return;
    }

    console.log("Creating series:", formData);
    imageService.createSeries(id, name, imageInput).then(() => {
      imageService.getAll().then((series) => {
        setSeries(series);
      });
    });

    onClose();
  };

  return (
    <div>
      <div>Create Series</div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Create" />
    </div>
  );
};

export default CreateSeriesForm;
