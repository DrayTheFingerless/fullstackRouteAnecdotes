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
import { deleteUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => {
    console.log("user in state: " + state.user)
    return state.user
  })

  const blogs = useSelector(state => { 
    console.log(state.blogs)
    return state.blogs
  })
  
  const blogFormRef = useRef();


  useEffect(() => {    
    dispatch(initBlogs())   
  }, [user]) 

  

  const handleLogout = async () => {
    dispatch(deleteUser());
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

  console.log("User:" + user)
  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm/>
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
