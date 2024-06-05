import { useEffect,useState } from "react"
import { FaTrash,FaEdit,FaCheck,FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import {toast} from 'react-toastify'
import    {
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} from '../../redux/Api/userSlice'
import Message from '../../components/Message'
import AdminMenu from "./AdminMenu"


const UserList = () => {
  const {data:users,refetch, isLoading , error} =useGetUserQuery()
  const [deleteUser]= useDeleteUserMutation()
  const [updateUser]=useUpdateUserMutation()

  const [editableUserId,seteditableUserId]=useState(null)
  const [editableUserName,seteditableUserName] = useState('')
  const [editableUserEmail,seteditableUserEmail] = useState('')

  useEffect(()=>{
    refetch()
  },[refetch])
  
  const deleteHAndler=async(id)=>{
    if (window.confirm("Are you sure>")) {
      try {
        await deleteUser(id)
        refetch()
        toast.success("Succesfully deleted user")
      } catch (error) {
        toast.error(error.data.message||error.error)
      }
    }
  }
  const toggleEdit=(id,name,email)=>{
      seteditableUserId(id)
      seteditableUserName(name)
      seteditableUserEmail(email)
  }
  const updateHandler = async(id)=>{
    try {
      await  updateUser({
        userId:id,
        username:editableUserName,
        email:editableUserEmail
      })
      seteditableUserId(null)
      refetch()
      toast.success("User Upadated succesfully")
    } catch (error) {
      toast.error(error.data.message||error.error)
    }
  }
  return (
    <div className="p-4 " >
       {isLoading? (<Loader/>):error?(<Message variant='danger'>{error?.data.message||error.message}</Message>):
         (<div className="flex flex-col md:flex-row">
            <AdminMenu/>
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
              </tr>
            </thead>
            <tbody>
              
              { 
              users.map(user=>(
                
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{
                    editableUserId === user._id?(
                      <div className="flex items-center">
                        <input type="text" value={editableUserName} 
                        onChange={e => seteditableUserName(e.target.value)} 
                        className="w-full p-2 border rounded-lg" />
                        <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                          <FaCheck/>
                        </button>

                      </div>
                    ):(
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button onClick={()=>toggleEdit(user._id,user.username,user.email)}>
                          <FaEdit className="ml-[1rem]"/>
                        </button>
                      </div>
                    )
                  }</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id?
                    (<div className="flex items-center">
                         <input type="text" 
                                value={editableUserEmail}
                                onChange={e=>seteditableUserEmail(e.target.value)}
                                className="ml-2  text-black py-2 px-4 border rounded-lg"
                         />
                         <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                         <FaCheck/>
                         </button>
                    </div> )
                    :(
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button onClick={()=>toggleEdit(user._id,user.username,user.email)}>
                           <FaEdit className="ml-[1rem]"/>
                        </button>
                      </div>
                    ) 
                  }
                  </td>
                  <td className="px-4 py-2 ">
                    {user.isAdmin?(
                      <FaCheck style={{color:"green"}}/>
                    ):(
                      <FaTimes style={{color:"red"}} />
                    )
                    }
                  </td>
                  <td className="px-4 py-2">
                     {!user.isAdmin &&(
                      <div className="flex">
                        <button onClick={()=>deleteHAndler(user._id)} 
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash/>
                        </button>
                      </div>
                     )}
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
         </div>)
       }

    </div>
  )
}

export default UserList
