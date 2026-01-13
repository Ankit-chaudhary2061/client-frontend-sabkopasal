import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchCart } from "../store/cart/cart-slice";
import store from "../store/store";

const NavBar = ()=>{
const navigate = useNavigate()
const dispatch = useAppDispatch()
const {user}=  useAppSelector((store)=>store.auth)  
const {items}=useAppSelector((store)=>store.cart) 
console.log(items,':navbar')
const [ isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
useEffect(()=>{
    const token = localStorage.getItem('token')
    const loggedin = !!token || !!user.token
    setIsLoggedIn(loggedin)
    dispatch(fetchCart())
    console.log(token,':token')
},[user?.token, dispatch])
const handleLogout =()=>{
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')
}
    return(
        <>
       <header className=" bg-black relative flex flex-none items-center py-8">
      <div className="container mx-auto flex flex-col gap-4 px-4  text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-8 xl:max-w-7xl">
        <div>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
          >
            Company
          </Link>
        </div>

        <nav className="space-x-3 md:space-x-6">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className="relative text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
              >
                Cart
                <sub className="ml-1 text-red-500 font-bold">
                  {items?.length ?? 0} 
                </sub>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
        </>
    )
}


export default NavBar