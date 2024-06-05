import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"

const Product = ({product})=> {
return(
    <div className="w-[25rem]  p-3 relative  ">
      <div className="relative ">
        <img src={product.image} alt={product.name}  />
        <HeartIcon product={product}/>
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
            <div className="flex justify-between items-center">
                <div className="text-lg -ml-5">{product.name.substring(0,20)}...</div>
                <span className="bg-pink-000 text-pink-800 text-sm border font-medium mr-2 px-2.5 py-2 
                  rounded-full dark:bg-pink-900 dark:text-pink-300
                ">
                   $ {product.price}
                </span>
            </div>
        </Link>
      </div>
    </div>                                                                                             
  )
}
export default Product