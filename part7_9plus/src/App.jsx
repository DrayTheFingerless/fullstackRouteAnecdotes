import "./index.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Users from "./components/Users";

import blogService from "./services/blogs";
import { createNotif } from "./reducers/notificationReducer";
import { initBlogs, addBlog, removeBlog, likeBlog } from "./reducers/blogsReducer";
import { deleteUser } from "./reducers/loginReducer";
import User from "./components/User";
import Blogs from "./components/Blogs";

import {
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => {
    console.log("user in state: " + state.user)
    return state.user
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

  console.log("User:" + user)
  if (!user) {
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
      <Link  to="/">Blogs</Link>
      <Link  to="/users">Users</Link>
      
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users></Users>} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/blogs/:id" element={<Blog />}/>
      </Routes>
    </div>
  );
};

export default App;
