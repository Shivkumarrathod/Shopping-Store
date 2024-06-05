import { useGetTopProductsQuery } from "../redux/Api/productSlice"
import Loader from "./Loader";
import SmallProduct from "../pages/products/SmallProduct";
import ProductCarousel from "../pages/products/ProductCarousel";

const Header = () => {
    const {data,isLoading,error} = useGetTopProductsQuery()
    if (isLoading) {
        return <Loader/>
    }if(error){
        return <h1>Error</h1>
    }
    return (
        <>
        <div className="flex justify-around ">
            <div className="xl:block lg:hidden  md:hidden sm:hidden ">
               <div className="grid grid-cols-2">
                    {data.map((product)=>(
                        <div key={product._id}>
                            <SmallProduct product = {product}/>
                        </div>   
                    ))}
               </div>
            </div>
            
            <ProductCarousel/>
        </div>
        </>
    )
}

export default Header
