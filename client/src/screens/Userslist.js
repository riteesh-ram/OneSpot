import React , {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUsers, deleteUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Error from '../components/Error'
import AdminNav from '../components/AdminNav'

export default function Userslist() {

    const getallusersstate = useSelector(state =>state.getAllUsersReducer)
    const {users , loading , error} = getallusersstate
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getAllUsers())
        
    }, [])

    return(
        <div>
            <AdminNav/>
            <h2>Users List</h2>
            <table className='table table-bordered table-responsive-sm'>

                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (<Loader/>)}
                    {error && (<Error error='Something went wrong'/>)}
                    {users && (users.map(user=>{
                        return <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><i class="far fa-trash-alt" onClick={()=>{dispatch(deleteUser(user._id))}}></i></td>
                        </tr>
                    }))}
                </tbody>

            </table>
            
        </div>
    )
}