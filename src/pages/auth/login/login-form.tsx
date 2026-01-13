import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ILoginData } from "./login-type";
import { Status } from "../../../lib/types/status-types";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hook";
import { loginUser, resetStatus } from "../../../lib/store/auth/auth-slice";


const LoginFrom = ()=>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const{status} = useAppSelector((store)=>store.auth)
console.log(status, ' :login status')
    const [fromData, setFromData]= useState<ILoginData>({
        email:'',
        password:''
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const{name, value} = e.target
        setFromData({
            ...fromData,
            [name]:value
        })
    }
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch(loginUser(fromData))
    }
    const [showPassword, setShowPassword] = useState(false);

      useEffect(() => {
  if (status === Status.SUCCESS) {
    
    navigate("/");
    dispatch(resetStatus());
  }

  if (status === Status.ERROR) {
    alert("Something went wrong");
  }
}, [status]);
    return(
        <>
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src="https://www.svgrepo.com/show/499664/user-happy.svg"
            alt="User icon"
            className="mx-auto h-16 w-16"
          />
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Create an Account ✨
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join our platform — it only takes a few seconds.
          </p>
        </div>

        {/* Form */}
        <form
         onSubmit={handleSubmit} 
         className="space-y-5">
       

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={fromData.email}
                onChange={handleChange}
                required
                className="pl-10 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-sky-500 text-sm focus:outline-none text-gray-800"
                placeholder="ankit@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={fromData.password}
                onChange={handleChange}
                required
                className="pl-10 pr-10 py-2 w-full rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-sky-500 text-sm focus:outline-none text-gray-800"
                placeholder="Enter a strong password"
              />
              {/* 👁️ Toggle Button */}
            <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
>
  {showPassword ? (
    <Eye className="h-5 w-5" />  // 👁️ Password visible → show open eye
  ) : (
    <EyeOff className="h-5 w-5" /> // 🚫👁️ Password hidden → show crossed eye
  )}
</button>

            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-sky-500 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-sky-600 transition-colors"
          >
            login here
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
           <span>Create an account</span>
          <Link
  to="/register"
  className="text-sky-600 hover:underline font-medium"
>
  log here
</Link>

        </p>
      </motion.div>
    </div>
        
        </>
    )
}


export default LoginFrom