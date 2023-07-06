import { useRef, useState } from "react";
import Button from "../common/Button";
import "./Form.css";

const Form = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({});

  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    const fieldValue = type === "file" ? Array.from(files) : e.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="form-wrapper">
      <div className="form-fields">
        {fields.map((field) => (
          <div key={field.name}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              {...(field.type === "file" && { multiple: field.multiple } && {
                  ref: fileInputRef,
                })}
              {...(field.accept && { accept: field.accept })}
              {...(field.min && { min: field.min })}
            />
            {field.type === "file" && (
              <Button
                title="upload"
                onClick={handleFileClick}
                className="file"
              />
            )}
          </div>
        ))}
      </div>
      <Button
        title={buttonText}
        onClick={handleSubmit}
        className={`submit ${buttonText === "Login" ? "login" : ""}`}
      />
    </div>
  );
};

export default Form;
