import { createSlice } from "@reduxjs/toolkit"
import login from "../services/login"
import blogs from "../services/blogs"
import users from "../services/users"
import { createNotif } from "../reducers/notificationReducer";

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
      try {
      const newUser = await login.login({username, password})    
      blogs.setToken(newUser.token);
      users.setToken(newUser.token)
      dispatch(createUser(newUser))  
      dispatch(createNotif("Logged in with user " + username, true));
      } catch (exception) {
        dispatch(createNotif("Error: " + exception, false));

      }
    }
}

export default loginSlice.reducer