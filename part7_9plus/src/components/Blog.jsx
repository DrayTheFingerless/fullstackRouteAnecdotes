import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { likeBlog } from "../reducers/blogsReducer"

const Blog = () => {
  const id = useParams().id  
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = useSelector(state => {
    console.log("user in state: " + state.user)
    return state.user
  })

  const blog = useSelector(state => {
    console.log("blog in state: " + state.blogs)
    return state.blogs.find(b => b.id === id) 
  })

  const addLike = () => {
    handleLike(blog);
  };

  const removeBlog = () => {
    handleRemove(blog.id);
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

  const checkBlogBelongs = () => {
    console.log("blog user id", blog.user);
    console.log("user id", user);

    return blog.user === user.username;
  };


  if(!blog) { return null }

  return (
    <div style={blogStyle} className="blog">
      <h2 className="blogTitleAuthor">
        {blog.title}
      </h2>
      <div className="blogDetailContent">
        <a href={blog.url}>{blog.url}</a>
        <p data-testid="numberLikes">
          {blog.likes} likes <button onClick={addLike}>Like</button>
        </p>
        <p>Added by {blog.author}</p>
        <h3>Comment</h3>
        {blog.comments.map((comment) => (
            <p>- {comment}</p>
          ))}
      </div>
      <p style={{ display: checkBlogBelongs ? "" : "none" }}>
        <button onClick={checkBlogBelongs}>Remove</button>
      </p>
    </div>
  );
};

export default Blog;
