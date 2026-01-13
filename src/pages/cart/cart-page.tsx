
import { Link } from "react-router-dom";
import { deleteCartItem, fetchCart, updateCartItem } from "../../lib/store/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useEffect } from "react";

const CartPage = ()=>{
  
  const dispatch= useAppDispatch()
  const {items,status} = useAppSelector((store)=>store.cart)
  console.log(items,':cartitems')

useEffect(() => {
  dispatch(fetchCart());
}, [dispatch]);

const handleDelete = async (productId: string) => {
  await dispatch(deleteCartItem(productId))
  console.log("DELETE clicked, productId =", productId);;
  dispatch(fetchCart());
};

const handleUpdate = async (productId: string, quantity: number) => {
  await dispatch(updateCartItem(productId, quantity));
  dispatch(fetchCart());
};
    
const totalItemInCarts =items.reduce((total,item)=>total + item.quantity,0)
 const totalPriceInCarts = items.reduce(
    (total, item) => total + item.quantity * Number(item.Product?.productPrice || 0),
    0
  );
    // Loading State



  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg font-medium">Loading cart...</p>
      </div>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some products to get started!</p>
        </div>
      </div>
    );
  }
    return(
        <>
            <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="pb-4 text-gray-600">Product</th>
                <th className="pb-4 text-gray-600">Quantity</th>
                <th className="pb-4 text-gray-600">Total</th>
                <th className="pb-4 text-gray-600">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length >0 && items.map((item, index) => {
              

                return (
                  <tr
                    key={item.Product.productId}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={item.Product?.productImageUrl || "/placeholder.png"}
                        alt={item.Product?.productName || "Product"}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover shadow"
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-900 text-lg">
                          {item.Product?.productName || "Unknown Product"}
                        </p>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {item.Product?.productDescription || "No description"}
                        </p>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2 border rounded-lg w-max px-2 py-1 bg-gray-50">
                        <button
                          onClick={() => handleUpdate(item.productId, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1 }
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="font-medium min-w-[2ch] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdate(item.productId, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                         
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-4 font-semibold text-gray-800">
                      ₹{(Number(item.Product?.productPrice || 0) * item.quantity).toLocaleString()}
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => handleDelete(item.productId)}
                        className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                       
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col h-fit sticky top-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Order Summary</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalItemInCarts}</span>
            </div>

            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{totalPriceInCarts.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹200</span>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between font-semibold text-lg text-gray-900">
              <span>Total</span>
              <span>₹{(totalPriceInCarts + 200).toLocaleString()}</span>
            </div>
          </div>

         <Link to='/checkout'>
          <button 
            className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={ items.length === 0}
          >
            Checkout Now
          </button>
         </Link>
        </div>
      </div>
    </div>
        
        
        </>
    )
}


export default CartPage