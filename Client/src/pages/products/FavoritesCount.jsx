import { useSelector } from "react-redux"


const FavoritesCount = () => {
    const favs = useSelector(state=>state.favorites)
    const favoriteCount = favs.length
  return (
    <div className="absolute top1 ">
        {favoriteCount>0&&(
            <span className="px-1 py-0 text-sm text-white bg-pink-600 rounded-lg ">{favoriteCount}</span>
        )}
    </div>
  )
}

export default FavoritesCount
