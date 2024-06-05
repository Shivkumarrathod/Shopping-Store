import { useState } from "react"
import { useParams,Link,useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useGetProductDetailsQuery,useCreateReviewMutation } from "../../redux/Api/productSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import {FaBox,FaClock,FaShoppingCart,FaStar,FaStore} from 'react-icons/fa'
import moment from "moment"
import HeartIcon from "./HeartIcon"
import Rating from "./Rating"
import ProductTabs from "./ProductTabs"
import { addToCart } from "../../redux/feauter/Cart/cartSlice"

const ProductDetails = () => {
    const dispatch = useDispatch()
    const {id:productId}= useParams()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')

    const {data:product ,isLoading, refetch ,error}= useGetProductDetailsQuery(productId)

    const {userInfo} = useSelector(state=>state.auth)
    const [createReview,{isLoading:loadingProductReview}] = useCreateReviewMutation()

    const submitHandler =async(e)=>{
      e.preventDefault()
      try {
       const result =  await createReview({
          productId,rating,comment
        }).unwrap()
        refetch()
        console.log(result);
        toast.success("Review created succefully")
      } catch (error) {
        toast.error(error?.data || error.message)
      }
    }

    const addToCartHandler =()=>{
      dispatch(addToCart({...product,qty}))
      navigate('/cart')
      toast.success('Product is added to the Cart')
    }
    
  return (
    <>
      <div>
        <Link to={'/'} className="text-white font-semibold hover:underline ml-[10rem]">Go back</Link>
      </div>

      {isLoading ? (<Loader/>):error?(<Message variant='danger'>{error?.data?.message || error.message}</Message>):(
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div>
                 <img src={product.image} alt={product.name} className="w-full xl:w-[35rem] lg:w-[25rem] md:[20rem] sm:w-[30rem] ] mr-[2rem]" />
                 <HeartIcon product={product}/>
            </div>

            <div className="flex flex-col justify-between">
                <h2 className="text-2xl  font-semibold">{product.name}</h2>
                <p className="my-4 xl:w-[20rem] lg:w-[20rem] md:w-[30rem] text-[#B0B0B0]">{product.description}</p>
                <p className="text-3xl my-4 font-extrabold">$ {product.price}</p>

                <div className="flex items-center justify-between w-[30rem]">
                     <div className="one">
                        <h1 className="flex items-center mb-6">
                            <FaStore className="mr-2 textwhite"/> Brand:{" "}
                            {product.brand}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaClock className="mr-2 textwhite"/> Added:{" "} 
                            {moment(product.createAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center mb-6">
                            <FaStore className="mr-2 textwhite"/> Reviews:{" "}
                            {product.numberReview}
                        </h1>
                     </div>
                     <div className="two">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Rating: {rating}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity: {product.quantity}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-white" /> In Stock: {product.countInStock}
                      </h1>
                     </div>
                </div>
              
              <div className="flex justify-between flex-wrap">
                <Rating value={product.rating} text={`${product.numberReview} reviews`} />
                  {product.countInStock >0&&(
                    <div>
                      <select value={qty} onChange={e=>setQty(e.target.value)} className="p-2 w-[6rem] rounded-lg text-white bg-black">
                        {[...Array(product.countInStock).keys()].map((x)=>(
                          <option value={x+1} key={x+1}>
                            {x+1}
                          </option>
                        ))}
                      </select>
                      
                    </div>
                  )}
                
              </div>
                  <div className="btn-container">
                    <button
                    onClick={addToCartHandler} 
                    disabled={product.countInStock ===0}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0">Add to Card</button>
                  </div>
            </div>
            <div className="mt-[5rem] ml-[10rem] container flex flex-wrap items-start justify-between ">
               <ProductTabs 
               loadingProductReview={loadingProductReview}
               userInfo={userInfo}
               submitHandler = {submitHandler}
               rating={rating}
               setRating = {setRating}
               setComment ={setComment}
               product= {product}
               />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails
