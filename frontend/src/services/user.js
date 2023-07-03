import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URI}/user`;

const register = async (username, password) => {
  const response = await axios.post(`${baseUrl}`, { username, password });
  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

export default { register, getUser };
