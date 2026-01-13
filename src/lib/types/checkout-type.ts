import { Product } from "./product-type"
import { Status } from "./status-types"

export enum PaymentMethod{
    COD = 'cod',
    ESEWA = 'esewa',
    KHALTI='khalti' 
}
export enum PaymentStatus{
    Unpaid = 'unpaid',
    Paid= 'paid',
    Pending = 'pending'
}

interface payment {
      paymentMethod:PaymentMethod
}
interface OrderPaymentData extends payment{
paymentStatus:PaymentStatus
}
export interface ItemDetails{
    productId:string,
    quantity:number
}
export interface OrderResponseItems extends ItemDetails{
    orderId:string
}
export interface OrderData{
    phoneNumber:string,
    shippingAddress:string,
    totalAmount:number,
    paymentDetails:payment,
    items:ItemDetails[]
}


export interface OrderResponseData{
    status:Status,
    items:OrderResponseItems[],
    khaltiUrl:null | string,
    myorders : MyOrderData [],
    orderDetails:OrderDetails[] 
}
export enum OrderStatus{
Pending ='pending',
Delivered = 'delivered',
OntheWay = 'ontheway',
Cancel = 'cancelled',
Preparation = 'preparation',
All = 'all'


}


interface UserData{
    username : string, 
    email : string 
}


export interface MyOrderData{
     id:string,
            phoneNumber: string,
            shippingAddress: string,
            totalAmount: number,
            orderStatus: OrderStatus,
            createdAt: string,
         
            paymentId: string,
            userId:UserData,
            Payment:OrderPaymentData
}



export interface OrderDetails{
    id:string,
    quantity:number,
    orderId:string,
    Product:Product,
    Order:MyOrderData

}