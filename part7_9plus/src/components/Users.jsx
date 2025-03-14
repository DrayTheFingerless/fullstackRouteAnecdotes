import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "../reducers/usersReducer.js";

const Users = () => {

const dispatch = useDispatch()
const users = useSelector(state => { 
    console.log(state.users)
     return state.users 
    })

useEffect(() => {    
    dispatch(initUsers())   
}, []) 
    
  return (
    <div>
        <table>
            <tbody>
            <tr>
                <td>User</td>
                <td>blogs created</td>
            </tr>   
            {users.map((user) => (
                <tr key= {user.username}>
                    <td>{user.name}</td>
                    <td>{user.blogs.length}</td>
                </tr>      
            ))}
            </tbody>
        </table>
    </div>
  );
};

export default Users;