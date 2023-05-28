import { useState } from "react";
import Button from "./Button";
import "./Header.css";
import "./Button.css";

const Form = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === "file" ? files : value;
    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <>
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "file" ? (
            <input
              type="file"
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              multiple={field.multiple}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <Button title={buttonText} onClick={handleSubmit} />
    </>
  );
};

export default Form;
