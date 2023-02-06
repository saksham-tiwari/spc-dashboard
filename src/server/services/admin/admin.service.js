import axios from "axios"
import {BaseUrl} from "../BaseUrl";

axios.defaults.baseURL = BaseUrl;

export const addProduct = async (data)=>{
    return await axios.post("/admin/addproduct",data, {headers: { "Content-Type": "multipart/form-data" }})
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const updateProduct = async (data)=>{
    return await axios.patch("/admin/updateproduct",data, {headers: { "Content-Type": "multipart/form-data" }})
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const deleteProduct = async (id)=>{
    return await axios.delete("/admin/deleteproduct/"+id)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}