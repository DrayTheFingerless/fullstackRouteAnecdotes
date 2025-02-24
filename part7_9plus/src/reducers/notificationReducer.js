import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers:{
        startNotif(state, action){
            return action.payload
        },
        deleteNotif(state){
            return null
        }
    }
})

export const {startNotif, deleteNotif} = notifSlice.actions

export const createNotif = (text, success) => {
    return dispatch => {
        dispatch(startNotif({text: text, success: success}))
        setTimeout(() => {
          dispatch(deleteNotif())
        }, 3000)
    }
}

export default notifSlice.reducer