import React, { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import Form from "./Form";
import "./Header.css";
import "./Button.css";

const CreateSeriesForm = ({ onClose, onCreateSeries }) => {
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
    // Handle creating the series
    console.log("Creating series:", formData);
    // You can perform any necessary logic or API calls here

    // Close the popup
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
