import { useState ,useEffect } from "react"
import {useDispatch , useSelector} from 'react-redux'
import { useGetFilteredProductsQuery } from "../redux/Api/productSlice"
import {
    setCategories,
    setProducts,
    setChecked,
} from '../redux/feauter/Shop/shopSlice'
import Loader from '../components/Loader'
import {useFetchCategoriesQuery} from '../redux/Api/categoryslice'
import ProductCard from "./products/ProductCard"

const Shop = () => {
  
  const dispatch = useDispatch()

  const {categories ,products ,checked ,radio} = useSelector(state=>state.shop)

  const categoriesQuery = useFetchCategoriesQuery()
  const [priceFilter ,setPriceFilter] = useState("")
  const filteredProductQuery = useGetFilteredProductsQuery({
    checked ,radio
  })
  useEffect(()=>{
    if(!categoriesQuery.isLoading){
      dispatch(setCategories(categoriesQuery.data))
    }
},[categoriesQuery.data ,dispatch])

   useEffect(()=>{
    if (!checked.length || !radio.length) {
      if (!filteredProductQuery.isLoading) {
        const filterProducts = filteredProductQuery.data.filter((product)=>{
          return (
            product.price.toString().includes(priceFilter) || 
            product.price === parseInt(priceFilter,10)
          )
        })
        dispatch(setProducts(filterProducts))
      }
    }
   },[checked ,radio ,filteredProductQuery.data ,dispatch,priceFilter])

   const handleBrandClick = (brand)=>{
    const  productsByBrand = filteredProductQuery.data?.filter(
      (product)=>product.brand === brand
    )
    dispatch(setProducts(productsByBrand))
   }

   const handlecheck = (value,id)=>{
    const  updateChecked = value?[...checked ,id]:
    checked.filter((c)=>c!==id)
    dispatch(setChecked(updateChecked))
   }

   const uniqueBrands = [
    ...Array.from(
      new Set(filteredProductQuery.data?.map((product)=>product.brand).filter((brand)=> brand !== undefined))
    )
   ]
   const handlePriceChange = e =>{
    setPriceFilter(e.target.value)
   }

  return (
    <div className="container mx-auto" >
      <div className="flex md:flex-row ">
        <div className="bg-[#151515] p-3 mt-2 ml-[8rem] mb-2">
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter by Categories</h2>
          <div className="p-5 w-[15rem]">
            {categories?.map((c)=>(
              <div key={c._id} className="mb-2">
                <div className="flex items-center mr-4">
                  <input type="checkbox" id="red-checkbox" className="bg-black w-4 h-4 text-pink-600 bg-black border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600
                  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={e=>handlecheck(e.target.checked,c._id)}
                   />
                   <label htmlFor="pink-checkbox" className="ml-2 text-xm font-medium text-white dark:text-gray-300">
                       {c.name}
                   </label>
                </div>
              </div>
            ))}

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter by Brands</h2>
            {uniqueBrands?.map((brand)=>(
              <div key={brand._id} className="mb-2">
                <div className="flex items-center mr-4 mb-5">
                  <input type="radio" id={brand} name="brand" className="bg-black w-4 h-4 text-pink-600 bg-black border-gray-300 rounded-full  
                  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  onChange={()=>handleBrandClick(brand)}
                   />
                   <label htmlFor="pink-checkbox" className="ml-2 text-xm font-medium text-white dark:text-gray-300">
                       {brand}
                   </label>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter by Price</h2>
          <div className="p-5 w-[15rem]">
            <input type="text" 
            placeholder="Enter Price"
            value={priceFilter}
            onChange={handlePriceChange}
            className="w-full h-10 text-white px-3 py-2 placeholder-gray-400 border rounded-lg
            focus:outline-none focus:ring focus:border-pink-300 bg-black"
            />
             <div className="p-5 pt-0">
              <button className="w-full border my-4 bg-pink-700 border-none rounded-lg" onClick={()=>window.location.reload()}>
                  Reset
              </button>
             </div>
          </div>
        </div>
        <div className="p-3">
            <h2 className="h4 text-center mb-2">
              {products?.length} Products
            </h2>
            <div className="flex flex-wrap">
              {products.length === 0?(
                <Loader/>
              ):(
                products?.map((p)=>(
                  <div className="p-3" key={p._id}>
                   <ProductCard p={p}/>
                  </div>
                  
                ))
              )}
            </div>
          </div>
      </div>
    </div>
  )
}

export default Shop
