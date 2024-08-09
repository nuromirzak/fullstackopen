import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const token = localStorage.getItem("loggedBlogappUser")
    ? JSON.parse(localStorage.getItem("loggedBlogappUser")).token
    : null;
  if (!token) {
    throw new Error("No token found");
  }
  const request = axios.post(baseUrl, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const token = localStorage.getItem("loggedBlogappUser")
    ? JSON.parse(localStorage.getItem("loggedBlogappUser")).token
    : null;
  if (!token) {
    throw new Error("No token found");
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = await request;
  return response.data;
};

const deleteBlog = async (id) => {
  const token = localStorage.getItem("loggedBlogappUser")
    ? JSON.parse(localStorage.getItem("loggedBlogappUser")).token
    : null;
  if (!token) {
    throw new Error("No token found");
  }
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteBlog };
