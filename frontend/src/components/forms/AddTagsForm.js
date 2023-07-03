import seriesService from "../../services/series";
import { useDispatch, useSelector } from "react-redux";
import { setTags } from "../../reducers/seriesViewSeries";
import Form from "./Form";

const AddTagsForm = ({ onClose }) => {
  const { series } = useSelector((state) => state.seriesViewSeries);
  const fields = [{ name: "tagsInput", type: "text", placeholder: "Tags" }];
  const dispatch = useDispatch();

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

    await seriesService.updateSeries(
      series.abbreviation,
      null,
      null,
      null,
      updatedTags,
      null
    );
    dispatch(setTags(updatedTags));

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
