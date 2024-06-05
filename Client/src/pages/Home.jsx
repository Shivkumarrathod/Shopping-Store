import { Link,useParams } from "react-router-dom"
import { useGetProductsQuery } from "../redux/Api/productSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Header from '../components/Header'
// import Product from "./pages/products/Product"
import Product from "./products/Product"

const Home = () => {
    const {keyword} = useParams()
    const {data,isLoading,isError} = useGetProductsQuery({keyword})
  return (
    <>
      {!keyword ? <Header/>:null}
      {isLoading ? (<Loader/>):isError?(<Message variant='denger'>
        {isError?.data?.message ||isError.error}
      </Message>):(
        <>
           <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[1rem] text-[3rem] ">Special Products</h1>

            <Link to='/shop' className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[1rem] ">
              Shop
            </Link>
            </div>

           <div>
            <div className="flex justify-center flex-wrap ml-[1rem]  mt-[2rem]">
              {data.products.map((product)=>(
                <div key={product._id}>
                    <Product product={product}/>
                 </div>
              ))}
            </div>
           </div>
        </>
      )}
    </>
  )
}

export default Home
