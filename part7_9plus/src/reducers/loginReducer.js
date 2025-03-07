import { createSlice } from "@reduxjs/toolkit"
import login from "../services/login"
import blogs from "../services/blogs"

const loginSlice = createSlice({
    name: "user",
    initialState: null,
    reducers:{
        createUser(state,action){
            return action.payload
          },
        deleteUser(state,action){
            return null
          }
    }
})

export const {createUser, deleteUser } = loginSlice.actions

export const loginUser = (username, password) => {  
    return async dispatch => {    
      const newUser = await login.login({username, password})    
      blogs.setToken(newUser.token);
      dispatch(createUser(newUser))  
    }
}

export default loginSlice.reducer