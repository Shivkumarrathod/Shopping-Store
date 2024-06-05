import { Link } from "react-router-dom"
import Rating from "./Rating"
import { useGetTopProductsQuery } from "../../redux/Api/productSlice"
import SmallProduct from './SmallProduct'
import Loader from "../../components/Loader"
import { useState } from "react"


const ProductTabs = ({loadingProductReview,userInfo,submitHandler,rating,setRating,Comment,setComment,product}) => {
  
  const {data ,isLoading} = useGetTopProductsQuery()

  const [activeTab ,setActiveTab] = useState(1)

  if(isLoading){
    return <Loader/>
  }
  const handleTabClick = (tabNumber)=>{
    setActiveTab(tabNumber)
  }
  return (
    <div className="flex flex-col md:flex-row">
        <section className="mr-[5rem] w-[20rem]">
            <div className={`flex-1 p-4 cursor-pointer hover:text-red-600  text-lg ${activeTab ===1 ? 'font-bold text-pink-600' :""}`} 
            onClick={()=>handleTabClick(1)}
            >
                Wriet Your Review
            </div>
            <div className={`flex-1 p-4 cursor-pointer hover:text-red-600 text-lg ${activeTab ===2 ? 'font-bold text-pink-600' :""}`} 
            onClick={()=>handleTabClick(2)}
            >
                All Reviews
            </div>
            <div className={`flex-1 p-4 cursor-pointer hover:text-red-600 text-lg ${activeTab ===3 ? 'font-bold text-pink-600' :""}`} 
            onClick={()=>handleTabClick(3)}
            >
                Related Products
            </div>
        </section>

        <section>
           {activeTab ===1 && (
            <mt-4>
                {userInfo ?(
                    <form onSubmit={submitHandler}>
                       <div className="my-2">
                        <label className="block text-xl mb-2" htmlFor="rating">Rating</label>
                        <select id="rating" required value={rating} onChange={e=>setRating(e.target.value)}
                         className="p-2 bg-black border rounded-lg xl:w-[40rem] text-block"
                        >
                          <option value="">select</option>
                          <option value="1">Inferior</option>
                          <option value="2">Decent</option>
                          <option value="3">Great</option>
                          <option value="4">Excellent</option>
                          <option value="5">Exceptional</option>

                        </select>
                       </div>

                       <div className="my-2">
                        <label htmlFor="comment" className="block text-xl mb-2">
                          Comment
                        </label>
                        <textarea name="" id="comment" rows='3' required value={Comment} onChange={e=>setComment(e.target.value)} className="p-2 bg-black border rounded-lg xl:w-[40rem] text-white"></textarea>
                       </div>
                       <button type="submit" disabled={loadingProductReview} className="bg-pink-600 text-white rounded-lg py-2 px-4" >submit</button>
                    </form>
                ):(
                    <p>Please <Link to='/login' className="text-blue-600">sign In</Link> to review</p>
                )}
            </mt-4>
           )}
        </section>
        <section>
          {activeTab === 2 && (
            <>
              <div>{product.reviews.length ===0 && <p>No Reviews</p>}</div>
              <div>
                {product.reviews.map((review)=>(
                  <div key={review._id} className="bg-[#1A1A1A] p-4 rounded-lg xl:mr-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                  >
                    <div className="flex justify-between">
                      <strong className="text-[B0B0B0]">{review.name}</strong>
                      <p className="text-[B0B0B0">{review.createdAt.substring(0,10)}</p>
                    </div>
                    <p className="my-4">{review.comment}</p>
                    <Rating value={review.rating}/>
                  </div>
                ))}
              </div>
            </>

          )}
        </section>
        <section>
          {activeTab === 3 && (
            <section className="ml-[5rem] flex flex-wrap">
              {!data ?<Loader/> :(
                data.map((product)=>(
                  <div key={product._id}>
                    <SmallProduct product={product}/>
                  </div>
                ))
              )}
            </section>
          )}
        </section>
    </div>
  )
}

export default ProductTabs
