import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../types/status-types";

import { AppDispatch, RootState } from "../store";
import api from "../../http/api";

import { Product, ProductState } from "../../types/product-type";


const initialState:ProductState ={
product :[],
status:Status.LOADING,
singleProduct:null
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct(state:ProductState, action:PayloadAction<Product[]>){
            state.product = action.payload
        },
        setStatus(state:ProductState, action:PayloadAction<Status>){
            state.status = action.payload
        },
        setSingleProduct(state:ProductState, action:PayloadAction<Product>){
            state.singleProduct = action.payload
        }
    }
})


export const {setProduct, setStatus,setSingleProduct} = productSlice.actions
export default productSlice.reducer

export function fetchProduct(){
    return async function fetchProductThunk(dispatch : AppDispatch){
        try {
            const response =  await api.get('/admin/product')
            if(response.status ===  200){
                  const {data }=response.data
                console.log(data,':dataa')
                dispatch(setProduct(data))
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

export function fetchProductById(productId :  string){
    return async function fetchProductByIdThunk(dispatch :AppDispatch, getState :()=>RootState){
        const state = getState()
        const existingProduct= state.product.product.find((Product:Product)=>Product.id === productId)
        if(existingProduct){
            dispatch(setSingleProduct(existingProduct))
            dispatch(setStatus(Status.SUCCESS))
        }else{
            try {
              const response = await api.post(`/admin/product/${productId}`)  
              if(response.status === 200){
                const{data}=response.data
                dispatch(setSingleProduct(data))
            dispatch(setStatus(Status.SUCCESS))

              }else{
            dispatch(setStatus(Status.ERROR))

              }
            } catch (error: any) {
                console.error(error)
            dispatch(setStatus(Status.ERROR))
                
            }
        }
    }
}