import { createSlice } from "@reduxjs/toolkit"
import blogs from "../services/blogs"

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers:{
        createBlog(state,action){
            state.push(action.payload)
          },
        updateBlog(state,action){
            const changedBlog = action.payload
            return state.map(blog =>
                blog.id !== changedBlog.id ? blog : changedBlog 
            ).sort((a, b) => b.likes - a.likes)
        },
        setBlogs(state,action){
            return action.payload.sort((a, b) => b.likes - a.likes)
          },
        deleteBlog(state,action){
            return state.filter(blog => 
                blog.id !== action.payload
            )
        }
    }
})

export const {setBlogs, updateBlog, deleteBlog, createBlog } = blogsSlice.actions

export const initBlogs = () => {  
    return async dispatch => {    
      const newBlogs = await blogs.getAll()    
      dispatch(setBlogs(newBlogs))  
    }
}
  
  export const addBlog = (content) => {
    return async dispatch => {
      const newBlog = await blogs.create(content)    
      dispatch(createBlog(newBlog))
    }
  }
  
  export const removeBlog = (id) => {
    return async dispatch => {
        await blogs.remove(id)    
        dispatch(deleteBlog(id))
      }
  }

  export const likeBlog = (blog) => {
    return async dispatch => {
      const updatedBlog = await blogs.put(anecdote.id,anecdote)
      dispatch(updateBlog(updatedBlog))
    }
  }
  
export default blogsSlice.reducer