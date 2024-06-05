import { useState } from "react"
import {AiOutlineHome,AiOutlineShopping,AiOutlineLogin,AiOutlineUserAdd,AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import './navigation.css'
import { useSelector,useDispatch } from "react-redux"
// import {useLogoutMutation} from '../../redux/Api/userSlice'
import { logout } from "../../redux/feauter/auth/authSlice"
import FavoritesCount from "../products/FavoritesCount"


const Navigation =()=>{
    const {userInfo} = useSelector(state => state.auth)

    const [dropdownOpen,setdropdownOpen] = useState(false)
    const [showSideBar,setshowSideBar]= useState(false)
    const {cartItems} = useSelector(state=>state.cart)
    const toggleDropdown =()=>{
        setdropdownOpen(!dropdownOpen)
    }
    const toggleSidebar =()=>{
        setshowSideBar(!showSideBar)
    }
    const closeSidebar =()=>{
        setshowSideBar(false)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    // const {logout} = useLogoutMutation()
    
    const logoutHandler =async ()=>{
        try {
            // const res =  await logout.unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }
    return <div style={{zIndex:999}} className={`${showSideBar? "hidden":"flex"} xl:flex lg:flex md:flex
    sm:flex flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id="navigation-container"
    >
       <div className="flex flex-col justify-center space-y-4">
          <Link to='/' className="flex items-center transition-transform transform hover:translate-x-2" >
            <AiOutlineHome size={26} className="mr-2 mt-[1rem] mb-6" />
             <span className="hidden nav-item-name mt-[1rem] mb-6" >HOME</span>{" "}
          </Link>
          <Link to='/shop' className="flex items-center transition-transform transform hover:translate-x-2" >
            <AiOutlineShopping size={26} className="mr-2 mt-[1rem] " />
             <span className="hidden nav-item-name mt-[1rem]" >SHOP</span>{" "}
          </Link>
          <Link to='/cart' className="flex relative" >
            <div className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShoppingCart size={26} className="mr-2 mt-[1rem]" />
               <span className="hidden nav-item-name mt-[1rem]" >CART</span>{" "}
            </div>
            
            <div className="absolute top-1">
              {cartItems.length >0 && (
                <span>
                  <span className="px-1 py-0 text-white bg-pink-600 rounded-full">
                    {cartItems.reduce((a,c)=>a+c.qty,0)}
                  </span>
                </span>
              )}
            </div>

          </Link>
          <Link to='/favorite' className="flex items-center transition-transform transform hover:translate-x-2" >
            <FaHeart size={20} className="-mr-2 mt-[1rem]" />
             <span className="hidden nav-item-name mt-[1rem] ml-[1rem]" >FAVORITE</span>{" "}
             <FavoritesCount />
          </Link>
       </div>
       
       <div className="realtive">
        <button onClick={toggleDropdown} className="flex items-center text-gray-8000 focus:outline-none" >
            
            {userInfo?
            <span className="text-white -ml-3" >{userInfo.username}</span>:<></>}

            {userInfo && (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                    dropdownOpen ? "transform rotate-180":""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                >
                    <path 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth='2'
                      d={dropdownOpen? "M5 15l7-7 7 7":"M19 9l-7 7-7-7"}
                    />
                </svg>
            )}
        </button>

        {
            dropdownOpen && userInfo && (
              <ul 
                 className={`absolute right-0  mr-[4rem] space-y-2 bg-black text-gray-600 ${
                  !userInfo.isAdmin ? "mt-[-6rem]" : "mt-[-23rem]"
                 }`}
               >

                 {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link to='/admin/dashboard' 
                        className="block px-4 py-2 hover:bg-gray-100 " >
                            Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to='/admin/productlist' className="block px-4 py-2 
                        hover:bg-gray-100 " >
                            Products
                        </Link>
                      </li>
                      <li>
                        <Link to='/admin/categorylist' className="block px-4 py-2 
                        hover:bg-gray-100 " >
                            Category
                        </Link>
                      </li>
                      <li>
                        <Link to='/admin/orderlist' className="block px-4 py-2 
                        hover:bg-gray-100 " >
                            Orders
                        </Link>
                      </li>
                      <li>
                        <Link to='/admin/userlist' className="block px-4 py-2 
                        hover:bg-gray-100 " >
                            Users
                        </Link>
                      </li>
                    </>
                 )}
                    <li>
                        <Link to='/profile' className="block px-4 py-2 
                        hover:bg-gray-100 " >
                            Profile
                        </Link>
                      </li>
                      <li>
                        <button className="block  px-4 py-2 
                        hover:bg-gray-100 "
                         onClick={logoutHandler}
                        >
                            Logout
                        </button>
                      </li>
              </ul>
            )
        }
       </div>
        
        {!userInfo &&(
             <ul>
             <li>
             <Link to='/login' className="flex items-center transition-transform transform hover:translate-x-2" >
                <AiOutlineLogin size={26} className="mr-2 mt-[1rem]" />
                <span className="hidden nav-item-name mt-[1rem]" >LOGIN</span>{" "}
             </Link>
             </li>
             <li>
             <Link to='/register' className="flex items-center transition-transform transform hover:translate-x-2" >
                <AiOutlineUserAdd size={26} className="mr-2 mt-[1rem]" />
                <span className="hidden nav-item-name mt-[1rem]" >REGISTER</span>{" "}
             </Link>
             </li>
         </ul>
        )}

       

    </div>
}

export default Navigation