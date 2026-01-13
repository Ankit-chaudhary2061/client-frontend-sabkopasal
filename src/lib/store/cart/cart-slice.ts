import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../types/status-types";

import { AppDispatch } from "../store";

import { CartItem, CartState } from "../../types/cart-slice-types";
import apiWithToken from "../../http/api-with-token";


const initialState:CartState ={
items :[],
status:Status.LOADING,

}
interface DeleteAction{
    productId:string
}
interface UpdateAction extends DeleteAction{
    quantity : number,
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setItems(state:CartState, action:PayloadAction<CartItem[]>){
            state.items = action.payload
        },
        setStatus(state:CartState, action:PayloadAction<Status>){
            state.status = action.payload
        },
     setDeleteItem(state: CartState, action: PayloadAction<DeleteAction>) {
  const index = state.items.findIndex(
    (item) => item.Product.productId === action.payload.productId
  );

  if (index !== -1) {
    state.items.splice(index, 1);
  }
},
 setUpdateItem(state: CartState, action: PayloadAction<UpdateAction>) {
  const index = state.items.findIndex(
    (item) => item.Product.productId === action.payload.productId
  );

  if(index !== -1){

                state.items[index].quantity = action.payload.quantity
            }
}

       
    }
})


export const {setItems, setStatus, setDeleteItem, setUpdateItem} = cartSlice.actions
export default cartSlice.reducer

export function fetchCart(){
    return async function fetchCartThunk(dispatch : AppDispatch){
        try {
            const response =  await apiWithToken.get('/customer/cart')
            if(response.status ===  200){
                  const {data }=response.data
                console.log(data,':dataa')
                dispatch(setItems(data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))

            }
       } catch (error:any) {
              console.error(error)

               dispatch(setStatus(Status.ERROR))
             
            
        }
    }
}

export function addToCart(productId:string){
    return async function addToCartThunk(dispatch:AppDispatch){
        try {
            const response = await apiWithToken.post('/customer/cart',{
                productId,
                quantity:1
            })
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}




export function deleteCartItem(productId:string) {
  return async function deleteCartItemThunk(dispatch: AppDispatch) {
    console.log("Thunk called with:", productId);

    try {
      const response = await apiWithToken.delete(
        "/customer/cart/" + productId
      );

      console.log("DELETE response:", response);

      dispatch(setStatus(Status.SUCCESS));
      dispatch(setDeleteItem({ productId }));
      
    } catch (error: any) {
      console.error("DELETE error:", error?.response || error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function updateCartItem(productId: string,quantity:number) {
  return async function updateCartItemThunk(dispatch: AppDispatch) {
    console.log("Thunk called with:", productId);

    try {
        const response = await apiWithToken.patch(
        "/customer/cart/" + productId,
        { quantity } 
      );


      console.log("DELETE response:", response);

      dispatch(setStatus(Status.SUCCESS));
      dispatch(setUpdateItem({ productId,quantity }));
    } catch (error: any) {
      console.error("DELETE error:", error?.response || error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}