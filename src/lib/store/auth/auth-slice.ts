import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types/auth-slice-type";
import { Status } from "../../types/status-types";
import { RegisterData } from "../../../pages/auth/register/register-types";
import { AppDispatch } from "../store";
import api from "../../http/api";
import { ILoginData } from "../../../pages/auth/login/login-type";


const initialState:AuthState ={
user :{} as User,
status:Status.LOADING
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state:AuthState, action:PayloadAction<User>){
            state.user = action.payload
        },
        setStatus(state:AuthState, action:PayloadAction<Status>){
            state.status = action.payload
        },
         resetStatus(state:AuthState){
            state.status  = Status.LOADING
        },
        setToken(state:AuthState, action:PayloadAction<string>){
            state.user.token = action.payload
        }
    }
})


export const {setUser, setStatus, resetStatus, setToken} = authSlice.actions
export default authSlice.reducer

export function registerUser(data: RegisterData) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));

      const response = await api.post("/register", data);

      if (response.status === 200 || 201) {
        dispatch(setStatus(Status.SUCCESS));
    
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}



export function loginUser(data:ILoginData){
    return async function loginUserThunk(dispatch:AppDispatch){
        try {
            const response = await api.post('/login', data)
            if(response.status === 200){
                dispatch(setUser(response.data.data))
               dispatch(setToken(response.data.data.token))
                localStorage.setItem('token', response.data.data.token)
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))

            }
        } catch (error :any ) {
            console.error(error);
      dispatch(setStatus(Status.ERROR)); 
        }
    }
}