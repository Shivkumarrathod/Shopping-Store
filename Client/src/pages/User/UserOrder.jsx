import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link  } from "react-router-dom"
import {useMyOrdersQuery} from '../../redux/Api/orderSlice'

const UserOrder = () => {

    const {data:orders ,isLoading,error} = useMyOrdersQuery()


  return (
    <div className="container mx-quto ml-[8rem]">
      <h2 className="text-2xl font-semibold mb-4 mt-6">Orders</h2>

      {isLoading ?(<Loader/>):error?(<Message variant='danger'>{error?.data?.error}</Message>
      ):(
        <table className="w-[90%]" >
            <tr>
                <th className="p-2">IMAGE</th>
                <th className="p-2">ID</th>
                <th className="p-2 ">DATE</th>
                <th className="p-2">TOTAL</th>
                <th className="p-2 ">PAID</th>
                <th className="p-2">DELIVERED</th>
                <th className="p-2"></th>
            </tr>

            {orders.map((order)=>(
                <tr key={order._id}>
                    <td className="p-2">
                        <img src={order.orderItems[0].image} alt={order.user} 
                          className="w-16 h-16 object-cover"
                        />
                    </td>
                    <td className="p-2">{order._id}</td>
                    <td className="p-2 text-center">{order.createdAt.substring(0.10)}</td>
                    <td className="p-2 text-center">{order.totalPrice}</td>
                    
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
                    <td className="px-2 py-2">
                        <Link to={`/order/${order._id}`}>
                            <button className="bg-pink-400 text-black py-2 px-3 rounded">
                            View details
                            </button>
                        </Link>
                    </td>
                </tr>
            ))}
    </table>
      )}
    </div>
  )
}

export default UserOrder
