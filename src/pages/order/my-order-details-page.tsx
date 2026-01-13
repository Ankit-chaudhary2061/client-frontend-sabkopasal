// import { useParams } from "react-router-dom"
// import { useAppDispatch, useAppSelector } from "../../lib/store/hook"
// import { useEffect } from "react"
// import { fetchMyorderDetails } from "../../lib/store/checkout/checkout-slice"



// const MyOrderDetailsPage = ()=>{
//  const { id } = useParams<{ id: string }>()
// const dispatch = useAppDispatch()
// const {orderDetails} = useAppSelector((store)=>store.order)
// console.log(orderDetails , ':Orderdetails')
// useEffect(() => {
//   if (id) {
//     dispatch(fetchMyorderDetails(id))
//   }
// }, [id, dispatch])

//     return(
//         <>
//          <div className="py-1 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    
//     <div className="flex justify-start item-start space-y-5 flex-col">
//       <h1 className="text-1xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-600">Order Details </h1>
//       <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{new Date(orderDetails[0]?.Order.createdAt).toLocaleDateString()}
// </p>
//     </div>
//     <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
//       <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
//         <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
//           <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">My Order</p>

           
//                 {
//                   orderDetails.length >0 && orderDetails.map((order)=>{
//                     return(
//                          <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" >
//                   <div className="pb-4 md:pb-8 w-full md:w-40" key={order.Order.id}>
//                     <img className="w-full hidden md:block"  src={order.Product.productImageUrl} alt="dress" />
                    
//                   </div>
//                     <p className="text-base dark:text-white xl:text-lg leading-6">{order.Product.productName}</p>
//                   <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
//                     <div className="w-full flex flex-col justify-start items-start space-y-8">
//                       <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800"></h3>
//                     </div>
//                     <div className="flex justify-between space-x-8 items-start w-full">
//                       <p className="text-base dark:text-white xl:text-lg leading-6">Rs.{order.Product.productPrice}  </p>
//                       <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Qty:{ order.quantity}</p>
//                       <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs. {order.Product.productPrice * order.quantity} </p>
//                     </div>
//                   </div>
//                 </div>
//                     )
//                   })
//                 }
          

            
    
     
//         </div>
//         <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
//           <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
//             <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
//             <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">

//               <div className="flex justify-between items-center w-full">
//                 <p className="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
//                 <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderDetails[0]?.Order?.Payment?.paymentMethod}</p>
//               </div>
//               <div className="flex justify-between items-center w-full">
//                 <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
//                 <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderDetails[0]?.Order?.Payment?.paymentStatus}</p>
//               </div>
//               <div className="flex justify-between items-center w-full">
//                 <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
//                 <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderDetails[0]?.Order?.orderStatus}</p>
//               </div>
//             </div>
//             <div className="flex justify-between items-center w-full">
//               <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
//               <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{orderDetails[0]?.Order?.totalAmount}</p>
//             </div>
//           </div>
//           <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
//             <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
//             <div className="flex justify-between items-start w-full">
//               <div className="flex justify-center items-center space-x-4">
//                 <div className="w-8 h-8">
//                   <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
//                 </div>
//                 <div className="flex flex-col justify-start items-center">
//                   <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Delivery Charge<br /><span className="font-normal">Delivery with 24 Hours</span></p>
//                 </div>
//               </div>
//               <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs 100</p>
//             </div>
//           </div>
//         </div>
//       </div>
//    <div>
//    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-2 md:p-1 xl:p-8 flex-col" style={{height:'300px'}}>
//         <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
//         <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
    
//           <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
//             <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
//               <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
//                 <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Address : {orderDetails[0]?.Order.shippingAddress }</p>
//                 <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Phone :  {orderDetails[0]?.Order.phoneNumber}</p>
//               </div>

//             </div>
//             <div className="flex w-full justify-center items-center md:justify-start md:items-start">
//             <>


//             <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" style={{marginTop:'10px'}}   >Cancel Order</button>
        
//             </>
//             </div>
// {/* 
//             <div className="flex w-full justify-center items-center md:justify-start md:items-start">
//               <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" style={{marginTop:'10px',backgroundColor:'red',color:'white'}}>Delete Order</button>
  
//             </div> */}
   
//           </div>
//         </div>
//       </div>



//    </div>
      
//     </div>
//   </div>
        
        
//         </>
//     )
// }


// export default MyOrderDetailsPage


import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../lib/store/hook"
import { useEffect } from "react"
import { fetchMyorderDetails } from "../../lib/store/checkout/checkout-slice"
import { Status } from "../../lib/types/status-types"

const MyOrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { orderDetails, status } = useAppSelector((store) => store.order)

  useEffect(() => {
    if (id) dispatch(fetchMyorderDetails(id))
  }, [id, dispatch])

  if (status === Status.LOADING) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium">
        Loading order details...
      </div>
    )
  }

  if (!orderDetails?.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No order details found
      </div>
    )
  }

  const order = orderDetails[0]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        <p className="text-sm text-gray-500">
          Placed on {new Date(order.Order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Order Items */}
        <div className="xl:col-span-2 space-y-6">

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">My Order</h2>

            <div className="space-y-6">
              {orderDetails.map((item) => (
                <div
                  key={item.Order.id}
                  className="flex flex-col md:flex-row gap-6 border-b pb-6 last:border-none"
                >
                  <img
                    src={item.Product.productImageUrl}
                    alt={item.Product.productName}
                    className="w-32 h-32 object-cover rounded-md"
                  />

                  <div className="flex-1 space-y-2">
                    <p className="font-medium text-lg">
                      {item.Product.productName}
                    </p>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Price: Rs. {item.Product.productPrice}</span>
                      <span>Qty: {item.quantity}</span>
                      <span className="font-semibold text-gray-800">
                        Rs. {item.Product.productPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>{order.Order.Payment?.paymentMethod}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Status</span>
                <span>{order.Order.Payment?.paymentStatus}</span>
              </div>

              <div className="flex justify-between">
                <span>Order Status</span>
                <span>{order.Order.orderStatus}</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>Rs. {order.Order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6 h-fit">
          <h3 className="text-lg font-semibold">Customer Details</h3>

          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium">Address:</span>{" "}
              {order.Order.shippingAddress}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {order.Order.phoneNumber}
            </p>
          </div>

          <button
            className="w-full py-3 border border-red-500 text-red-500 rounded-md
                       hover:bg-red-50 transition font-medium"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyOrderDetailsPage
