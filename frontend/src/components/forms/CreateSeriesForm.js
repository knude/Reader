import imageService from "../../services/imageService";
import Form from "./Form";

const CreateSeriesForm = ({ setSeries, onClose }) => {
  const fields = [
    { name: "name", type: "text", placeholder: "Series Name" },
    { name: "id", type: "text", placeholder: "Series ID" },
    { name: "tagsInput", type: "text", placeholder: "Tags" },
    {
      name: "imageInput",
      type: "file",
      placeholder: "",
      accept: "image/png, image/gif, image/jpeg",
    },
  ];

  const handleSubmit = async (formData) => {
    const { name, id, imageInput, tagsInput } = formData;
    const image = imageInput?.[0];
    const tags = tagsInput.split(",").map((tag) => tag.trim()) || [];

    if (!name || !id || !image) {
      return;
    }

    console.log("Creating series:", formData);
    imageService.createSeries(id, name, image, tags).then(() => {
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
    <div>
      <span>Create Series</span>
      <div className="description">Separate tags with commas</div>
      <Form fields={fields} onSubmit={handleSubmit} buttonText="Create" />
    </div>
  );
};

export default CreateSeriesForm;
