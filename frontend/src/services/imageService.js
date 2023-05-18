import axios from "axios";
import FormData from "form-data";

const baseUrl = "http://localhost:3001/api/images";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (path) => {
  const response = await axios.get(`${baseUrl}/${path}`, {
    responseType: "blob",
  });
  return response.data;
};

const create = async (series, chapter, file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("series", series);
  formData.append("chapter", chapter);

  const response = await axios.post(`${baseUrl}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const remove = async (path) => {
  const response = await axios.delete(`${baseUrl}/${path}`);
  return response.data;
};

export default { getAll, create, get, remove };
