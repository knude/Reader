import axios from "axios";
import FormData from "form-data";

const baseUrl = `${process.env.REACT_APP_API_URI}/series`;

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

const getImage = async (series, chapter, page) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${series}/chapters/${chapter}/pages/${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

const createChapter = async (series, chapter, title, files) => {
  const config = {
    "Content-Type": "multipart/form-data",
    headers: { Authorization: token },
  };

  try {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    if (title) {
      formData.append("title", title);
    }

    const response = await axios.post(
      `${baseUrl}/${series}/chapters/${chapter}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

const getSeries = async (seriesId) => {
  try {
    const response = await axios.get(`${baseUrl}/${seriesId}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

const createSeries = async (seriesId, name, description, image, tags) => {
  const config = {
    "Content-Type": "multipart/form-data",
    headers: { Authorization: token },
  };

  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    if (description) formData.append("description", description);

    for (let i = 0; i < tags.length; i++) {
      formData.append("tags", tags[i]);
    }

    const response = await axios.post(
      `${baseUrl}/${seriesId}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

const updateSeries = async (
  seriesId,
  name,
  description,
  image,
  tags,
  chapters
) => {
  const config = {
    "Content-Type": "multipart/form-data",
    headers: { Authorization: token },
  };
  try {
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

    const response = await axios.put(
      `${baseUrl}/${seriesId}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

/* const remove = async (path) => {
  const response = await axios.delete(`${baseUrl}/${path}`);
  return response.data;
}; */

const removeChapter = async (seriesId, chapter) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.delete(
      `${baseUrl}/${seriesId}/chapters/${chapter}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

const removeSeries = async (seriesId) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${seriesId}`, config);
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
  }
};

export default {
  createChapter,
  createSeries,
  getImage,
  getAll,
  getSeries,
  removeChapter,
  removeSeries,
  setToken,
  updateSeries,
};
