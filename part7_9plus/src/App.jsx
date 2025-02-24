import "./index.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

import loginService from "./services/login";
import blogService from "./services/blogs";
import { createNotif } from "./reducers/notificationReducer";
import { initBlogs, addBlog, removeBlog, likeBlog } from "./reducers/blogsReducer";

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => { 
    console.log(state.blogs)
    return state.blogs
  })
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
    dispatch(initBlogs())   
  }, [user]) 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(createNotif("Logged in with user " + user.name, true));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(createNotif("Wrong credentials", false));
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  const handleCreate = async ({ url, title, author }) => {
    try {
      dispatch(addBlog({ url, title, author }));
      blogFormRef.current.toggleVisibility();
      dispatch(createNotif("New blog created",true));
    } catch (exception) {
      dispatch(createNotif("Error trying to creat blog: " + exception.message, false));
      console.log(exception);
    }
  };

  const handleLike = async (newObject) => {
    try {
      dispatch(likeBlog(newObject))
    } catch (exception) {
      dispatch(createNotif("Error trying to like blog: " + exception.message, false));
      console.log(exception);
    }
  };

  const handleRemove = async (newObject) => {
    try {
      dispatch(removeBlog(newObject))
    } catch (exception) {
      dispatch(createNotif("Error trying to like blog: " + exception.message, false));
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
        <Notification />
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
      <Notification />
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
