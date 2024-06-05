import { PRODUCTS_URL,UPLOADS_URL } from "../constent";
import {apiSlice} from './apiSlice'

export const productSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        getProducts :builder.query({
            query:({keyword})=>({
                url:`${PRODUCTS_URL}`,
                params :{keyword}
            }),
            keepUnusedDataFor:5,
            providesTags:["Products"]
        }),
        getProductsById : builder.query({
           query : (productId )=>`${PRODUCTS_URL}/${productId}`,
           providesTags: (result ,error , productId)=>[{
            type:"Product",id:productId
           }]
        }),
        allProduct : builder.query({
            query : ()=>`${PRODUCTS_URL}/allproducts`
        }),
        getProductDetails : builder.query({
            query: (productId)=>({
               url : `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor:5,
        }),
        createProduct : builder.mutation({
            query : (productData)=>({
                url: `${PRODUCTS_URL}`,
                method :"POST",
                body:productData,
            }),
            invalidatesTags:["Product"]
        }),
        updateProduct : builder.mutation({
            query : ({productId,formData})=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:"PUT",
                body:formData,
            })
        }),
        uploadProductIamge : builder.mutation({
          query:(data)=>({
            url:`${UPLOADS_URL}`
            ,method:'POST',
            body:data,
          })
        }),
        deleteProduct : builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:"DELETE",
            }),
            providesTags:["Product"]
        }),
        createReview : builder.mutation({
            query :(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}/reviews`,
                method:"POST",
                body:data
            })
        }),
        getTopProducts : builder.query({
            query :()=> `${PRODUCTS_URL}/top`,
            keepUnusedDataFor:5
        }),
        getNewProducts : builder.query({
            query :()=> `${PRODUCTS_URL}/new`,
            keepUnusedDataFor:5
        }),
        getFilteredProducts : builder.query({
            query :({checked ,radio})=>({
                url :`${PRODUCTS_URL}/filtered-products`,
                method:"POST",
                body:{checked , radio}
            })
        })
        
    })

})

export const {
    useGetProductsQuery,
    useGetProductsByIdQuery,
    useAllProductQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductIamgeMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useGetFilteredProductsQuery,
} = productSlice