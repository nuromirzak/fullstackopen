import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import { BlogForm } from './components/BlogForm'
import { Notification } from './Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const localStorageItem = localStorage.getItem('loggedBlogappUser')
    if (localStorageItem) {
      const user = JSON.parse(localStorageItem)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return <LoginForm setUser={setUser} notification={notification} setNotification={setNotification} />
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.username} logged-in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm setBlogs={setBlogs} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App