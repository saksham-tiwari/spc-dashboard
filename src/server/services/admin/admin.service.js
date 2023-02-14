import axios from "axios"
import {BaseUrl} from "../BaseUrl";
import accessHeader from "../Header";
import { signout } from "../../redux/actions/user";
import store from "../../redux/store"



axios.defaults.baseURL = BaseUrl;
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    //   if(error.response.config.url)
    if (401 === error.response.status) store.dispatch(signout(false))
    // else if(401 === error.response.status && error.response.data.error.data!=="Invalid credentials") store.dispatch(signout(true))
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const addProduct = async (data)=>{
    return await axios.post("/admin/addproduct",data, {headers: {Authorization:accessHeader().headers.Authorization, "Content-Type": "multipart/form-data" }})
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const updateProduct = async (data)=>{
    return await axios.patch("/admin/updateproduct",data, {headers: {Authorization:accessHeader().headers.Authorization, "Content-Type": "multipart/form-data" }})
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const deleteProduct = async (id)=>{
    return await axios.delete("/admin/deleteproduct/"+id,accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const getAllOrders = async (filter="",search="")=>{
    let route = filter?("/admin/filterorder?status="+filter):("/admin/filterorder")
    route = search?(route+"?search="+search):(route)
    return await axios.get(route,accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const updateStatus = async (payid,status)=>{
    return await axios.patch("/admin/updatestatus",{payid,status},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}