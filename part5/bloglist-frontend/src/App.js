import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [notification, setNotification] = useState({
  //   message: null,
  //   cssClass: null,
  // });
  const [notificationsStack, setNotificationsStack] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const userJSON = window.localStorage.getItem('logged_user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const foundUser = await loginService.login({ username, password })
      setUser(foundUser)
      const userJSON = JSON.stringify(foundUser)
      window.localStorage.setItem('logged_user', userJSON)
      flashMessage(`Successfully logged in as ${foundUser.name}`, 'success')
      console.log('Successfully finished login process')
    } catch (error) {
      console.log('Error logging in: ', error)
      flashMessage(error.response.data.error, 'danger')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('logged_user')
    flashMessage('Successfully logged out', 'success')
    console.log('Successfully logged out')
  }

  const handleBlogCreation = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog, user.token)
      setBlogs(blogs.concat(createdBlog))
      flashMessage(
        `Successfully created blog: ${createdBlog.title}`,
        'success'
      )
      createdBlog.user = user.name
      console.log('Successfully created blog: ', createdBlog)
    } catch (error) {
      console.log('Error creating blog: ', error)
      flashMessage(error.response.data.error, 'danger')
    }
  }

  const handleBlogUpdate = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)))
      flashMessage(
        `Successfully updated blog: ${updatedBlog.title}`,
        'success'
      )
      console.log('Successfully updated blog: ', updatedBlog)
    } catch (error) {
      console.log('Error updating blog: ', error)
      flashMessage(error.response.data.error, 'danger')
    }
  }

  const handleBlogDelete = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Are you sure you want to delete this blog with name ${blogToDelete.title}?`
      )
    ) {
      try {
        const deletedBlog = await blogService.deleteBlog(id, user.token)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        flashMessage(
          `Successfully deleted blog: ${blogToDelete.title}`,
          'success'
        )
        console.log('Successfully deleted blog: ', deletedBlog)
      } catch (error) {
        console.log('Error deleting blog: ', error)
        flashMessage(error.response.data.error, 'danger')
      }
    } else {
      console.log('User cancelled blog deletion')
    }
  }

  const flashMessage = (message, cssClass, duration = 5000) => {
    setNotificationsStack((prevNotificationsStack) => [
      ...prevNotificationsStack,
      { message, cssClass },
    ])
    setTimeout(() => {
      setNotificationsStack((prevNotificationsStack) =>
        prevNotificationsStack.slice(1)
      )
    }, duration)
  }

  return (
    <>
      {notificationsStack.map((notification, index) => (
        <Notification
          key={index}
          message={notification.message}
          cssClass={notification.cssClass}
        />
      ))}

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

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={handleBlogUpdate}
                deleteBlog={handleBlogDelete}
              />
            ))}
        </div>
      )}
    </>
  )
}

export default App
