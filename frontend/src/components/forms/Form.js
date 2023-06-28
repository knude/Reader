import { useState } from "react";
import Button from "../common/Button";
import "./Form.css";

const Form = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    const fieldValue = type === "file" ? Array.from(files) : e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div>
      <div className="form-wrapper">
        <div className="form-fields">
          {fields.map((field) => (
            <div key={field.name}>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
                {...(field.type === "file" && { multiple: field.multiple })}
                {...(field.accept && { accept: field.accept })}
                {...(field.min && { min: field.min })}
              />
            </div>
          ))}
        </div>
        <Button title={buttonText} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Form;
