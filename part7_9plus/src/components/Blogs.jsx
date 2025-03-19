import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
     const blogs = useSelector(state => { 
        console.log(state.blogs)
        return state.blogs
      })

    return(
        <div>
            {blogs.map((blog) => (
            <p style= {blogStyle} key={blog.id}>
              <Link  to={`/blogs/${blog.id}`}>{blog.title}</Link> 
            </p>
         ))}
        </div>
    )
}

export default Blogs