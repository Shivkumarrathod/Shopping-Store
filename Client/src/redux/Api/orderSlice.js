import {apiSlice} from './apiSlice'
import { ORDERS_URL ,PAYPAL_URL } from '../constent'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      createOrder:builder.mutation({
        query:(order)=>({
            url:ORDERS_URL,
            method:"POST",
            body:order
        })
      }),

      getOrderDetails:builder.query({
        query:(id)=>({
          url:`${ORDERS_URL}/${id}`
        })
      }),
      payOrder:builder.mutation({
        query:({orderId,details})=>({
            url:`${ORDERS_URL}/${orderId}/pay`,
            method:"PUT",
            body:details
        })
      }),
      getOrders :builder.query({
        query:()=>({
            url:ORDERS_URL
        })
      })
      ,
      getPaypalClientId:builder.query({
        query:()=>({
          url:PAYPAL_URL,
        })
      }),
      myOrders:builder.query({
        query:()=>({
          url:`${ORDERS_URL}/mine`
        }),
        keepUnusedDataFor:5,
      }),
      deliverdOrder :builder.mutation({
        query:(orderID)=>({
            url:`${ORDERS_URL}/${orderID}/deliver`,
            method:"PUT"
        })
      }),
      getTotalOrders:builder.query({
        query:()=>({
            url:`${ORDERS_URL}/total-orders`
        })
      }),
      getTotalSales:builder.query({
        query:()=>({
            url:`${ORDERS_URL}/total-sales`
        })
      }),
      getTotalSalesbyDate:builder.query({
        query:()=>({
            url:`${ORDERS_URL}/total-sales-date`
        })
      })

    })
})

export const {
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesbyDateQuery,
    
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useMyOrdersQuery,
    useDeliverdOrderMutation,
    useGetOrdersQuery,
} = orderApiSlice