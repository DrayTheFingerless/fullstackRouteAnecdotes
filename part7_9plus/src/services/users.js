import axios from "axios";
const baseUrl = "/api/users";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const getBlogs = async (id) => {
  console.log("token", token)
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(`${baseUrl}/${id}/blogs`, config)
}


export default { getAll, getBlogs, setToken };
