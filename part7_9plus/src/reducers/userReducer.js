import { createSlice } from "@reduxjs/toolkit"
import users from "../services/users"

const userSlice = createSlice({
    name: "featuredUser",
    initialState: null,
    reducers:{
        setUser(state, action){
            return action.payload
        },
    }
})
export const { setUser } = userSlice.actions



export default userSlice.reducer