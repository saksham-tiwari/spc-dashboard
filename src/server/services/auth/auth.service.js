import axios from "axios"
import {BaseUrl} from "../BaseUrl";

axios.defaults.baseURL = BaseUrl;

export const signup = async (data)=>{
    return await axios.post("/auth/register",data)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const login = async (data)=>{
    return await axios.post("/auth/login",data)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const forgotPass = async (data)=>{
    return await axios.post("/auth/forgot-password",data)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const otp = async (email,otp)=>{
    return await axios.post("/auth/otp-verify",{email,otp})
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const resendOtp = async (data)=>{
    return await axios.post("/auth/otp",data)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const changePass = async (data)=>{
    return await axios.post("/auth/set-password",data)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}


export const logout = (cond)=>{
    localStorage.clear()
    // if(cond)window.location.reload()
}