import { useState } from "react";
import Button from "../common/Button";
import "./Form.css";

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
    <div>
      <div className="form-wrapper">
        <div className="form-fields">
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
                  min={field.min}
                />
              )}
            </div>
          ))}
        </div>
        <Button
          title={buttonText}
          onClick={handleSubmit}
          style={{ position: "absolute", right: "0px", bottom: "0px" }}
        />
      </div>
    </div>
  );
};

export default Form;
