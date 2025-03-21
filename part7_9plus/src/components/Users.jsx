import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { initUsers } from "../reducers/usersReducer"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'
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
        <Table striped>
            <tbody>
            <tr>
                <td>User</td>
                <td>blogs created</td>
            </tr>   
            {users.map((user) => (
                <tr key= {user.username}>
                    <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link> 
                    </td>
                    <td>{user.blogs.length}</td>
                </tr>      
            ))}
            </tbody>
        </Table>
    </div>
  );
};

export default Users;