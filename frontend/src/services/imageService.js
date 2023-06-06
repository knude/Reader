import axios from "axios";
import FormData from "form-data";

const baseUrl = "http://localhost:3001/api/images";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/series`);

  return response.data;
};

const getImage = async (series, chapter, page) => {
  const response = await axios.get(
    `${baseUrl}/series/${series}/chapters/${chapter}/pages/${page}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

const createChapter = async (series, chapter, title, files) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  if (title) {
    formData.append("title", title);
  }

  const response = await axios.post(
    `${baseUrl}/series/${series}/chapters/${chapter}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const getSeries = async (seriesId) => {
  const response = await axios.get(`${baseUrl}/series/${seriesId}`);
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

const updateSeries = async (
  seriesId,
  name,
  description,
  image,
  tags,
  chapters
) => {
  const formData = new FormData();

  if (name) formData.append("name", name);
  if (description) formData.append("description", description);
  if (image) formData.append("image", image);
  if (tags) {
    for (let i = 0; i < tags.length; i++) {
      formData.append("tags", tags[i]);
    }
  }
  if (chapters) {
    for (let i = 0; i < chapters.length; i++) {
      formData.append("chapters", chapters[i]._id);
    }
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

const removeChapter = async (seriesId, chapter) => {
  const response = await axios.delete(
    `${baseUrl}/series/${seriesId}/chapters/${chapter}`
  );
  return response.data;
};

const removeSeries = async (seriesId) => {
  const response = await axios.delete(`${baseUrl}/series/${seriesId}`);
  return response.data;
};

export default {
  createChapter,
  createSeries,
  updateSeries,
  getImage,
  getAll,
  getSeries,
  remove,
  removeChapter,
  removeSeries,
};
