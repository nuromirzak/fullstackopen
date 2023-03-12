import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: 10,
    border: "1px solid black",
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        <p>
          URL: <span style={{ fontFamily: "Monospace" }}>{blog.url}</span>
        </p>
        <p>
          Likes: <span style={{ fontFamily: "Monospace" }}>{blog.likes}</span>
        </p>
        <p>
          Name of the user who added the blog:{" "}
          <span style={{ fontFamily: "Monospace" }}>{blog.user}</span>
        </p>
      </div>
    </div>
  );
};

export default Blog;
