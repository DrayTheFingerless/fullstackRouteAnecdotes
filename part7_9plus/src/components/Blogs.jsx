import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs, removeBlog, likeBlog } from "../reducers/blogsReducer";
import Blog from "./Blog";
const Blogs = () => {

    const user = useSelector(state => {
        console.log("user in state: " + state.user)
        return state.user
      })

      
     const blogs = useSelector(state => { 
        console.log(state.blogs)
        return state.blogs
      })

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

    return(
        <div>
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
    )
}

export default Blogs