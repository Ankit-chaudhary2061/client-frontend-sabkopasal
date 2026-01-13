


// const CheckoutPage = ()=>{
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import store from "../../lib/store/store";
import { ItemDetails, OrderData, PaymentMethod } from "../../lib/types/checkout-type";
import { orderItem } from "../../lib/store/checkout/checkout-slice";
import { Status } from "../../lib/types/status-types";
import { useNavigate } from "react-router-dom";




const CheckoutPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {items}=useAppSelector((store)=>store.cart)
    const {khaltiUrl,status}=useAppSelector((store)=>store.order)
    console.log(khaltiUrl,':url')
    console.log(status, ':status')
    console.log(khaltiUrl, ':orders')
    console.log(items,':checkout')
    const[paymentMethod,setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD)
    const[data, setData]=useState<OrderData>({
      shippingAddress:'',
      phoneNumber:'',
      totalAmount:0,
      paymentDetails:{
        paymentMethod:PaymentMethod.COD
      },
      items:[]

    })
//    const handlePaymenthMethod = (e: ChangeEvent<HTMLInputElement>) => {
//   const value = e.target.value as PaymentMethod;
//   setPaymentMethod(value);
//   setData({
//     ...data,
//     paymentDetails:{
//       paymentMethod:value
//     }
//   })
// };
const handlePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value as PaymentMethod;

  setPaymentMethod(value);

  setData((prev) => ({
    ...prev,
    paymentDetails: {
      paymentMethod: value,
    },
  }));
};

console.log(paymentMethod,':payment checkout')
const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
  const {name, value}=e.target
  setData({
    ...data,
    [name]:value
  })
console.log(data)
}
const handleSubmit =async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const itemDetails:ItemDetails[] = items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  console.log(itemDetails ,':itemDetails'); // 
   const totalAmount = items.reduce(
    (total, item) => total + item.quantity * Number(item.Product?.productPrice || 0),
    0
  );
const orderData = {
  ...data,
  items:itemDetails,
  totalAmount
}
console.log(orderData,':orderData')
await dispatch(orderItem(orderData))
if(khaltiUrl){
  window.location.href = khaltiUrl
  console.log(khaltiUrl)
}

};
useEffect(() => {
  if (status === Status.SUCCESS && paymentMethod === PaymentMethod.COD) {
    alert("Order placed successfully 🎉");
    navigate("/");
  }

  if (khaltiUrl) {
    window.location.href = khaltiUrl;
  }
}, [status, khaltiUrl, paymentMethod, navigate]);


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="border-b bg-white py-5 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review your order and complete payment
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 py-10 grid gap-8 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Order Summary
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Check your items before placing order
          </p>

          {/* Item */}
<div className="space-y-6">
  {items.length > 0 &&
    items.map((item) => (
      <div
        key={item.Product.productId}
        className="relative flex gap-4 rounded-2xl bg-white p-5 shadow-md hover:shadow-xl transition-all duration-300 group"
      >
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <img
            src={item.Product.productImageUrl}
            alt={item.Product.productName}
            className="h-28 w-32 rounded-xl object-cover border border-gray-200"
          />
          {/* Quantity Badge */}
          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-semibold">
            {item.quantity}
          </span>
          {/* Category Badge */}
          <span className="absolute -top-2 left-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
            {item.Product.Category?.categoryName || "Uncategorized"}
          </span>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <p className="font-semibold text-gray-900 text-lg">
              {item.Product.productName}
            </p>
           
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-bold text-gray-900">
              Rs. {item.Product.productPrice * item.quantity}
            </p>
            <p className="text-sm text-gray-500">
              Rs. {item.Product.productPrice} each
            </p>
          </div>
        </div>

        {/* Remove Button */}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition">
          &#10005; {/* or use an icon */}
        </button>
      </div>
    ))}
</div>




          {/* Payment Method */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
  <h3 className="text-lg font-semibold text-gray-900">
    Payment Method
  </h3>

  <div className="space-y-4">
    {/* COD */}
    <label className="flex items-center gap-4 rounded-xl border bg-white p-4 cursor-pointer
      hover:border-gray-400 transition
      has-[:checked]:border-black has-[:checked]:bg-gray-50">

      <input
        type="radio"
        name="payment"
        value={PaymentMethod.COD}
        checked={paymentMethod === PaymentMethod.COD}
        onChange={handlePaymentMethod}
        className="h-4 w-4 accent-black"
      />

      <span className="font-medium text-gray-900">
        Cash on Delivery
      </span>
    </label>

    {/* Khalti */}
    <label className="flex items-center gap-4 rounded-xl border bg-white p-4 cursor-pointer
      hover:border-gray-400 transition
      has-[:checked]:border-black has-[:checked]:bg-gray-50">

      <input
        type="radio"
        name="payment"
        value={PaymentMethod.KHALTI}
        checked={paymentMethod === PaymentMethod.KHALTI}
        onChange={handlePaymentMethod}
        className="h-4 w-4 accent-black"
      />

      <span className="font-medium text-gray-900">
        Khalti (Online Payment)
      </span>
    </label>
  </div>

  {/* Submit Button */}

</form>

        </div>

        {/* RIGHT */}
        
      <form
  onSubmit={handleSubmit}
  className="h-fit rounded-2xl bg-white p-6 shadow-sm"
>
  <h2 className="text-lg font-semibold text-gray-900">
    Payment Details
  </h2>
  <p className="mt-1 text-sm text-gray-500">
    Enter your information to complete order
  </p>

  <div className="mt-6 space-y-4">
    {/* Phone */}
    <input
      type="text"
      onChange={handleChange}
      name="phoneNumber"
      value={data.phoneNumber}
      placeholder="Phone number"
      required
      className="w-full rounded-lg border px-4 py-3 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-gray-900"
    />

    {/* Address */}
    <input
      type="text"
      name="shippingAddress"
      value={data.shippingAddress}
      onChange={handleChange}
      placeholder="Shipping address"
      required
      className="w-full rounded-lg border px-4 py-3 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-gray-900"
    />

    {/* Payment Method */}
    {/* <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Payment Method</p>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          name="paymentMethod"
          value={PaymentMethod.COD}
          checked={paymentMethod === PaymentMethod.COD}
          onChange={handlePaymentMethod}
        />
        Cash on Delivery
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="radio"
          name="paymentMethod"
          value={PaymentMethod.KHALTI}
          checked={paymentMethod === PaymentMethod.KHALTI}
          onChange={handlePaymentMethod}
        />
        Khalti
      </label>
    </div> */}

    {/* Price Summary */}
    <div className="mt-6 space-y-3 border-t pt-4 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">
          Rs.{" "}
          {items.reduce(
            (t, i) => t + i.quantity * Number(i.Product?.productPrice || 0),
            0
          )}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium">Rs. 200</span>
      </div>

      <div className="flex justify-between border-t pt-3 text-lg font-semibold">
        <span>Total</span>
        <span>
          Rs.{" "}
          {items.reduce(
            (t, i) => t + i.quantity * Number(i.Product?.productPrice || 0),
            0
          )+200}
        </span>
      </div>
    </div>

    {/* Submit */}
    {/* <button
      type="submit"
      className="mt-6 w-full rounded-lg bg-gray-900 py-3 
                 font-medium text-white hover:bg-gray-800 transition"
    >
      Place Order
    </button> */}

    {paymentMethod === PaymentMethod.KHALTI ? (
      <button
        type="submit"
        className=" mt-6  w-full rounded-lg bg-purple-600 py-3 
                   font-medium text-white hover:bg-purple-700 transition"
      >
        Pay with Khalti
      </button>
    ):(
        <button
      type="submit"
      className="mt-6 w-full rounded-lg bg-gray-900 py-3 
                 font-medium text-white hover:bg-gray-800 transition"
    >
      Place Order
    </button>
    )
    
    }
  </div>
</form>

      </div>
    </div>
  );
};

export default CheckoutPage;
