import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyOrderData, OrderData, OrderDetails, OrderResponseData, OrderResponseItems, OrderStatus } from "../../types/checkout-type";
import { Status } from "../../types/status-types";
import { AppDispatch } from "../store";
import apiWithToken from "../../http/api-with-token";

const initialState:OrderResponseData = {
    items:[],
    status:Status.LOADING,
    khaltiUrl:null,
    myorders:[],
    orderDetails:[]
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setItems(state:OrderResponseData, action:PayloadAction<OrderResponseItems>){
            state.items.push(action.payload)
        },
         setMyOrders(state:OrderResponseData, action:PayloadAction<MyOrderData[]>){
            state.myorders = action.payload
        },
        setStatus(state:OrderResponseData , action:PayloadAction<Status>){
            state.status = action.payload
        },
        setKhaltiUrl(state:OrderResponseData, action:PayloadAction<OrderResponseData['khaltiUrl']>){
            state.khaltiUrl = action.payload
        },
         setOrdersDetails(state:OrderResponseData, action:PayloadAction<OrderDetails[]>){
            state.orderDetails = action.payload
        },
        updateOrderStatus(state:OrderResponseData, action:PayloadAction<{status:OrderStatus,orderId:string}>){
            const status = action.payload.status 
            const orderId = action.payload.orderId
            const updatedOrder = state.myorders.map(order=>order.id == orderId ? {...order,orderStatus : status} : order)
            state.myorders = updatedOrder
        }
        
    }
})
export const {setItems,setStatus, setKhaltiUrl,setMyOrders, setOrdersDetails, updateOrderStatus} = orderSlice.actions
export default orderSlice.reducer


export function orderItem(data :OrderData){
    return async function orderItemThunk(dispatch:AppDispatch){
        try {
            const response = await apiWithToken.post('/customer/order', data)
            if(response.status === 200 || 201){
                dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                if(response.data.payment_url){
                    dispatch(setKhaltiUrl(response.data.payment_url))
                }else{
                    dispatch(setKhaltiUrl(null))

                }
            }else{
                dispatch(setStatus(Status.ERROR))

            }
        } catch (error) {
            console.log(error)            
                dispatch(setStatus(Status.ERROR))
            
        }
    }
}
export function fetchMyorder(){
    return async function fetchMyorder(dispatch:AppDispatch){
        try {
            const response = await apiWithToken.get('/customer/order')
            if(response.status === 200 || 201){
                dispatch(setMyOrders(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
             
            }else{
                dispatch(setStatus(Status.ERROR))

            }
        } catch (error) {
            console.log(error)            
                dispatch(setStatus(Status.ERROR))
            
        }
    }
}


export function fetchMyorderDetails(id:string){
    return async function fetchMyorderDetails(dispatch:AppDispatch){
        try {
            const response = await apiWithToken.get('/customer/order/'+id)
            if(response.status === 200 || 201){
                dispatch(setOrdersDetails(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
             
            }else{
                dispatch(setStatus(Status.ERROR))

            }
        } catch (error) {
            console.log(error)            
                dispatch(setStatus(Status.ERROR))
            
        }
    }
}


export function updateOrderStatusInStore(data:any){
    return function updateOrderStatusInStoreThunk(dispatch:AppDispatch){
        dispatch(updateOrderStatus(data))
    }
}