import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link  } from "react-router-dom"
import {useGetOrdersQuery} from '../../redux/Api/orderSlice'
import AdminMenu from './AdminMenu'
import { useEffect } from "react"


const OrderList = () => {

    const {data:orders ,isLoading,error,refetch} = useGetOrdersQuery()
     console.log(orders);
     useEffect(()=>{
        refetch()
     },[refetch])
  return (<>
    {isLoading ?(<Loader/>):error?(<Message variant='danger'>{error?.data?.error||error.error}</Message>
    ):(
        <>
         <AdminMenu/>
            <table className="container w-[90%] ml-[5rem] mt-4" >
            
            <thead className="w-full border ">
                <tr >
                    <th className="text-left pl-1">ITEMS</th>
                    <th className="text-left pl-1">ID</th>
                    <th className="text-left pl-1 ">USER</th>
                    <th className="text-left pl-1">DATA</th>
                    <th className="text-left pl-1 ">TOTAL</th>
                    <th className="text-left pl-1">PAID</th>
                    <th className="text-left pl-1">DELIVERED</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
              {orders.map((order)=>(
                <tr key={order._id}> 
                     <td className="p-2">
                        <img src={order.orderItems[0].image} alt={order._id} 
                          className="w-[5rem] pt-4 "
                        />
                    </td>
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">{order.user ?order.user.username:'N/A'}</td>

                    <td>
                        {order.createdAt ?order.createdAt.substring(0,10):'N/A'}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                        {order.isPaid?(
                            <p className="p-1  text-center bg-green-400 w-[6rem] rounded-full">
                                Completed
                            </p>
                        ):(
                            <p className="p-1  text-center bg-red-400 w-[6rem] rounded-full">
                              Pending
                            </p> 
                        )}
                    </td>
                    <td >
                        {order.isDelivered?(
                            <p className="p-1  text-center bg-green-400 w-[6rem] rounded-full">
                                Completed
                            </p>
                        ):(
                            <p className="p-1  text-center bg-red-400 w-[6rem] rounded-full">
                              Pending
                            </p> 
                        )}
                    </td>
                    <td>
                    <Link to={`/order/${order._id}`}>
                            <button className=" text-white py-2 px-3 rounded">
                            More
                            </button>
                        </Link>
                    </td>
                </tr>
              ))}   
            </tbody>
            
         </table>
        </>
    )}
  </>

        )
  }

export default OrderList
