import { Status } from "./status-types"

export interface User{
    id:string,
    email:string,
    username:string
}

export interface Category{
    id:string,
    categoryName:string
}
export interface ProductCart{
    productId:string,
    productName:string,
    productDescription:string,
    productImageUrl:string,
    productPrice : number,
    productTotalStockQty:number
    createdAt :string,
    updatedAt:string
    user:User,
    userId :string,
    Category:Category
}
export interface CartItem{
    Product:ProductCart,
    quantity : number,
    productId:string
}


export interface CartState{
    items : CartItem[],
    status:Status
}

 

