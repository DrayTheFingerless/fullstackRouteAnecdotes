import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setUser } from "../reducers/userReducer";

const User = ({users}) => {
    const dispatch = useDispatch()

    const id = useParams().id  

    const user = useSelector(state => { 
        console.log(state.users)
        return state.users.find(u => u.id === id)  
    })

    useEffect(() => {   
        dispatch(setUser(user)) 
    }, [user])


    if (!user) { console.log("no user")
         return null }

    return (
        <div>
            <h3>{user.name}</h3>
            <h4>Added blogs</h4>
            {user.blogs.map((blog) => (
                <p key={blog.id}>{blog.title}</p>
            ))}
        </div>
    )
}

export default User
