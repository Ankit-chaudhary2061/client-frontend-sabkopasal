import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useEffect } from "react";
import { fetchProduct } from "../../lib/store/product/product-slice";




const Product = ()=>{
    const dispatch = useAppDispatch()
    const{product}= useAppSelector((store)=>store.product)
    console.log(product,':product')
    useEffect(()=>{
        dispatch(fetchProduct())
    },[])
    return (
        <>
         <div className="grid grid-cols-12 gap-4 p-6 mt-16">
      {product.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 
                     bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                     rounded-2xl shadow-lg hover:shadow-2xl 
                     border border-gray-200 dark:border-gray-700 
                     overflow-hidden transition-all cursor-pointer"
        >
          <Link to={`/product/${item.id}`} className="block">
            {/* Product Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              {item.productImageUrl ? (
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={item.productImageUrl} // ✅ full Cloudinary URL
                  alt={item.productName}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-2xl">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                HOT
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {item.productName}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
                {item.productDescription}
              </p>

              {/* Price */}
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 block">
                ${item.productPrice}
              </span>
            </div>
          </Link>

          {/* Buttons outside the Link */}
          <div className="p-6 pt-0 flex items-center justify-between gap-3">
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 
                         text-white font-semibold shadow-md transition-all"
            >
              Buy Now
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
            //   onClick={() => handleAddToCart(item)}
              className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 
                         text-white font-semibold shadow-md transition-all"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
        </>
    )
}

export default Product