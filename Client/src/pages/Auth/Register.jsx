import { useState,useEffect } from "react"
import { Link,useLocation,useNavigate, } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { useSignupMutation } from "../../redux/Api/userSlice"
import { setCredientials } from "../../redux/feauter/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

const Register = () => {
    const [username,setUserName]=useState('')
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signup,{isLoading}] =useSignupMutation()

    const {userInfo} =useSelector(state =>state.auth)

    const {search} = useLocation()

    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    const handleSubmit =async (e)=>{
        e.preventDefault()
        if (password!=confirmPassword) {
            toast.error('Passwords do not match')
        }else{
        try {
            const res = await signup({username,email,password}).unwrap()
            dispatch(setCredientials({...res}))
            navigate(redirect)
            toast.success("Register succesfully")
        } catch (error) {
            toast.error(error?.data?.message||error.message)
        }
        }
    }
  return (
    <div>
        <section className="pl-[17rem] flex flex-wrap" >
            <div className="mr-[4rem] mt-[5rem]">
               <h1 className="text-2xl font-semibold mb-4">Register</h1>

               <form onSubmit={handleSubmit} className="container w-[40rem]" >
               <div className="my-[2rem]">
                   <label htmlFor="username" className="block text-sm font-medium ">User Name</label>
                   <input type="text" id="username" className="mt-1 p-2 border rounded w-full" value={username} 
                   onChange={(e)=>setUserName(e.target.value)}
                  />
                </div>
                <div className="my-[2rem]">
                   <label htmlFor="email" className="block text-sm font-medium ">Email Address</label>
                   <input type="email" id="email" className="mt-1 p-2 border rounded w-full" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                </div>
                <div className="my-[2rem]">
                   <label htmlFor="password" className="block text-sm font-medium ">Password</label>
                   <input type="password" id="password" className="mt-1 p-2 border rounded w-full" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                </div>
                <div className="my-[2rem]">
                   <label htmlFor="confirmPassword" className="block text-sm font-medium ">Confirm Password</label>
                   <input type="password" id="confirmPassword" className="mt-1 p-2 border rounded w-full" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
                </div>
                <button disabled={isLoading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading? "Registering...":"Sign Up"}</button>
                {isLoading && <Loader/>}
               </form>

               <div className="mt-3">
                <p className="text-white">
                    Have an Account ?{" "}
                    <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}
                    className="text-pink-500 hover:underline"
                    >Login</Link>
                </p>
               </div>
            </div>

           
        </section>
    </div>
  )
}

export default Register
