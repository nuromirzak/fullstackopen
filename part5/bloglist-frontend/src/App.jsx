import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import Togglable from './components/Togglable'
import { Notification } from './Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

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

  const updateBlog = async (blog) => {
    const response = await blogService.update(blog.id, blog)
    setBlogs(blogs.map(b => b.id === blog.id ? response : b))
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const onBlogCreate = async (blog) => {
    const repsonse = await blogService.create(blog)
    setBlogs(blogs.concat(repsonse))
    blogFormRef.current.toggleVisibility()
    setNotification({ message: `a new blog ${blog.title} by ${blog.author} added`, success: true })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.username} logged-in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onBlogCreate={onBlogCreate} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} updateBlog={updateBlog} user={user} />
      ))}
    </div>
  )
}

export default App