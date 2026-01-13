import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth/auth-slice'
import productSlice from './product/product-slice'
import cartSlice from './cart/cart-slice'
import orderSlice from './checkout/checkout-slice'


const store  = configureStore({
  reducer:{
    auth: authSlice,
    product:productSlice,
    cart:cartSlice,
    order:orderSlice
  }
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
