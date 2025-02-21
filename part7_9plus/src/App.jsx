import "./index.css";
import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";

import loginService from "./services/login";
import blogService from "./services/blogs";

const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }

  return <div className={success ? "success" : "error"}>{message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    console.log("sort by likes");
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setSuccessMessage("Logged in with user " + user.name);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  const handleCreate = async ({ url, title, author }) => {
    try {
      const createdBlog = await blogService.create({ url, title, author });
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(createdBlog).sort((a, b) => b.likes - a.likes));
      setSuccessMessage("New blog created");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Error trying to creat blog: " + exception.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log(exception);
    }
  };

  const handleLike = async (newObject) => {
    try {
      await blogService.put(newObject.id, newObject);
      setBlogs(
        blogs
          .map((blog) => (blog.id === newObject.id ? newObject : blog))
          .sort((a, b) => b.likes - a.likes),
      );
    } catch (exception) {
      setErrorMessage("Error trying to like blog: " + exception.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log(exception);
    }
  };

  const handleRemove = async (newObject) => {
    try {
      await blogService.remove(newObject.id);
      setBlogs(
        blogs
          .filter((a) => a.id !== newObject.id)
          .sort((a, b) => b.likes - a.likes),
      );
    } catch (exception) {
      setErrorMessage("Error trying to like blog: " + exception.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log(exception);
    }
  };

  const checkBlogBelongs = (user, blog) => {
    console.log("blog user id", blog.user);
    console.log("user id", user);

    return blog.user === user.username;
  };

  if (user === null) {
    return (
      <>
        <Notification success={true} message={successMessage} />
        <Notification success={false} message={errorMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </>
    );
  }

  return (
    <div>
      <Notification success={true} message={successMessage} />
      <Notification success={false} message={errorMessage} />
      <p>{user.name} logged-in</p>
      <button onClick={handleLogout}>Logout</button>
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <CreateBlog handleCreate={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          handleLike={handleLike}
          handleRemove={handleRemove}
          key={blog.id}
          blog={blog}
          canRemove={checkBlogBelongs(user, blog)}
        />
      ))}
    </div>
  );
};

export default App;
