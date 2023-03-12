import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    cssClass: null,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const userJSON = window.localStorage.getItem("logged_user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const foundUser = await loginService.login({ username, password });
      setUser(foundUser);
      const userJSON = JSON.stringify(foundUser);
      window.localStorage.setItem("logged_user", userJSON);
      flashMessage(`Successfully logged in as ${foundUser.name}`, "success");
      console.log("Successfully finished login process");
    } catch (error) {
      console.log("Error logging in: ", error);
      flashMessage(error.response.data.error, "danger");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("logged_user");
    flashMessage("Successfully logged out", "success");
    console.log("Successfully logged out");
  };

  const handleBlogCreation = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog, user.token);
      setBlogs(blogs.concat(createdBlog));
      flashMessage(
        `Successfully created blog: ${createdBlog.title}`,
        "success"
      );
      console.log("Successfully created blog: ", createdBlog);
    } catch (error) {
      console.log("Error creating blog: ", error);
      flashMessage(error.response.data.error, "danger");
    }
  };

  const flashMessage = (message, cssClass, duration = 5000) => {
    setNotification({
      message,
      cssClass,
    });
    setTimeout(() => {
      setNotification({
        message: null,
        cssClass: null,
      });
    }, duration);
  };

  return (
    <>
      <Notification
        message={notification.message}
        cssClass={notification.cssClass}
      />

      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h2>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </h2>

          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={handleBlogCreation} />
          </Togglable>

          <h2>blogs</h2>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
