import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./Api/apiSlice";
import authReducer from './feauter/auth/authSlice'
import favoritesReducer  from '../redux/feauter/fevoriates/fevoriteSlice'
import { getFavoritesFromLocalStorage } from "../utils/localStorage";
import cartSliceReducer from '../redux/feauter/Cart/cartSlice'
import ShopReducer from '../redux/feauter/Shop/shopSlice'
const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favorites :favoritesReducer,
        cart:cartSliceReducer,
        shop:ShopReducer,
    },
    preloadedState:{
        favorites:initialFavorites
    },
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})

setupListeners(store.dispatch)
export default store