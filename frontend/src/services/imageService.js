import axios from "axios";
import FormData from "form-data";

const baseUrl = "http://localhost:3001/api/images";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`);

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

const createMultiple = async (series, chapter, title, files) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  formData.append("series", series);
  if (title) {
    formData.append("title", title);
  }
  formData.append("chapter", chapter);

  const response = await axios.post(`${baseUrl}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getSeries = async (seriesId) => {
  const response = await axios.get(`${baseUrl}/${seriesId}`);
  return response.data;
};

const createSeries = async (seriesId, name, description, image, tags) => {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("name", name);
  formData.append("description", description);
  for (let i = 0; i < tags.length; i++) {
    formData.append("tags", tags[i]);
  }

  const response = await axios.post(`${baseUrl}/series/${seriesId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updateSeries = async (seriesId, name, description, image, tags) => {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("name", name);
  formData.append("description", description);
  for (let i = 0; i < tags.length; i++) {
    formData.append("tags", tags[i]);
  }

  const response = await axios.put(`${baseUrl}/series/${seriesId}`, formData, {
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

export default {
  create,
  createMultiple,
  createSeries,
  updateSeries,
  get,
  getAll,
  getSeries,
  remove,
};
