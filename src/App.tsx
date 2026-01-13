import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './lib/store/store';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Home from './pages/home/Home';
import SingleProduct from './pages/product/single-product';

import Cart from './pages/cart/cart';
import Checkout from './pages/checkout/checkout';
import MyOrder from './pages/order/order';
import MyOrderDetais from './pages/order/order-details';
import {io} from 'socket.io-client'

export const socket = io("http://localhost:8000",{
  auth : {
    token : localStorage.getItem('token')
  }
})



function App() {


  return (
    <>
  <Provider store={store}>

     <BrowserRouter>
 <Routes>
 <Route path='/register' element={<Register/>}/>
 <Route path='/login' element={<Login/>}/>
 <Route path='/' element={<Home/>}/>
 <Route path='/cart/' element={<Cart/>}/>
 <Route path='/checkout' element={<Checkout/>}/>
 <Route path='/myorders' element={<MyOrder/>}/>
 <Route path='/myorders/:id' element={<MyOrderDetais/>}/>




 <Route path='/product/:id' element={<SingleProduct/>}/>


 </Routes>
 
 </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
