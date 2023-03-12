import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;

  const allUsers = await axios.get("/api/users");
  const users = allUsers.data;

  const blogs = response.data.map((blog) => {
    const user = users.find((user) => user.id === blog.user);
    return {
      ...blog,
      username: user.username,
    };
  });

  // return response.data;
  return blogs;
};

const create = async ({ title, author, url }, token) => {
  const request = axios.post(
    baseUrl,
    { title, author, url },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const response = await request;
  return response.data;
};

const update = async (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog);

  const response = await request;

  return response.data;
};

const deleteBlog = async (id, token) => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await request;

  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deleteBlog };
