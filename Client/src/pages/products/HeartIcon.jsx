import {FaHeart,FaRegHeart} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { addToFavorites,removeFromFavotites,setFavorites } from '../../redux/feauter/fevoriates/fevoriteSlice'
import { addFavoriteToLocalStorage,getFavoritesFromLocalStorage,removeFavoriteFromLocalStorage } from '../../utils/localStorage'
import { useEffect } from 'react'

const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state =>state.favorites)||[]
    const isFavorite = favorites.some((p)=>p._id === product._id)
      
    useEffect(()=>{
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage))
    },[])
    const toggleFavorites =()=>{
       if (isFavorite) {
        dispatch(removeFromFavotites(product))
        removeFavoriteFromLocalStorage(product._id)
       }else{
        dispatch(addToFavorites(product))
        addFavoriteToLocalStorage(product)
       }
    }
  return (
    <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer'>
         {isFavorite ?(
            <FaHeart  className='text-red-700 '/>
         ):(
            <FaHeart className='text-white '/>
         )}
    </div>
  )
}

export default HeartIcon