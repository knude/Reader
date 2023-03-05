import axios from "axios";

const getAll = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default getAll;
