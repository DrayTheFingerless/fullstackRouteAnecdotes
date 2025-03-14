import { createSlice } from "@reduxjs/toolkit"
import users from "../services/users"
import blogs from "../services/blogs"

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers:{
        setUsers(state, action){
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export const initUsers = () => {  
    return async dispatch => {    
      var newUsers = await users.getAll()   
      dispatch(setUsers(newUsers))  
    }
}

export default usersSlice.reducer