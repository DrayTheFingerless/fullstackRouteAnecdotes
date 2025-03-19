import { useParams } from "react-router-dom"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addComment, likeBlog } from "../reducers/blogsReducer"

const Blog = () => {
  const id = useParams().id  
  const dispatch = useDispatch()
  const [comment, setComment] = useState("");


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

  const handleAddComment = async (event) => {
      event.preventDefault();
      console.log("new comment", comment)
      dispatch(addComment(blog,comment))
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
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <div>
            <input
              type="type comment..."
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <button type="submit">add comment</button>
        </form>
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
