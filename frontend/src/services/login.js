import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URI}/login`;

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}`, { username, password });
  return response.data;
};

export default { login };
