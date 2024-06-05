import { useState,useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from '../../components/Loader'
import {setCredientials} from '../../redux/feauter/auth/authSlice'
import {Link} from 'react-router-dom'
import { useProfileMutation } from "../../redux/Api/userSlice"


const Profile = () => {
  const [username,setUserName] =useState('')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [confirmPassword,setconfirmPassword] =useState('')

  const {userInfo} =useSelector(state=>state.auth)
  const [updatePRofile,{isLoading:loadingUpadteProfile}]=useProfileMutation()

  useEffect(()=>{
    setUserName(userInfo.username)
    setEmail(userInfo.email)

  },[userInfo.email,userInfo.username])

  const dispatch = useDispatch()

  const submitHandler = async (e)=>{
    e.preventDefault()
    if(password!=confirmPassword){
      toast.error("Password do not match")
    }else{
      try {
        const res = await updatePRofile({_id:userInfo._id,username,email,password}).unwrap()
        dispatch(setCredientials({...res}))
        toast.success("Profile Upadte succeffully")
      } catch (error) {
        toast.error(error?.data?.message||error.message)
      }
    }
  }

  return (

    <div className="container  mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4 ">
        <div className="md:w-1/3 bg-black text-white p-4 rounded">
          <h2 className="text-2xl font-semibold mb-4 ">Update Profile</h2>

        <form onSubmit={submitHandler} >
          <div className="mb-4">
            <label htmlFor="userName" className="block text-white mb-2 ">Name</label>
            <input 
              type="text" 
              placeholder="Enter Name"
              className="form-input p-4 rounded-sm w-full text-black"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2 ">Email</label>
            <input 
              type="Email" 
              placeholder="Enter email"
              className="form-input p-4 rounded-sm w-full text-black"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2 ">Password</label>
            <input 
              type="password" 
              placeholder="Enter Password"
              className="form-input p-4 rounded-sm w-full text-black"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ConfirmPassword" className="block text-white mb-2 ">Confirm Password</label>
            <input 
              type="text" 
              placeholder="Confirm Password"
              className="form-input p-4 rounded-sm w-full text-black"
              value={confirmPassword}
              onChange={(e)=>{setconfirmPassword(e.target.value)}}
            />
          </div>
          <div className="flex justify-between">
            <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
             Upadte
            </button>

            <Link to='/user-orders' className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">
              My Orders
            </Link>
          </div>
        </form>
        </div>
        {loadingUpadteProfile&& <Loader/>}
      </div>
      
    </div>
  )
}

export default Profile
