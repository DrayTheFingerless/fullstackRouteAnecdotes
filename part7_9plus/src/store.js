import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({  
    reducer: {    
      notification: notificationReducer,
      blogs: blogsReducer,
      user: loginReducer,
      users: usersReducer,
      featuredUser: userReducer  
    }
})
  
export default store