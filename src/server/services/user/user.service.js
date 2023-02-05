import axios from "axios"
import { signout } from "../../redux/actions/user";
// import { logout } from "../auth/auth.service";
import {BaseUrl} from "../BaseUrl";
import accessHeader from "../Header";
import store from "../../redux/store"

axios.defaults.baseURL = BaseUrl;
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    //   if(error.response.config.url)
    const isCart = error.response.config.url.split("/")[2].slice(0,4)==="cart";
    if (401 === error.response.status && !isCart) store.dispatch(signout(true))
    else if(401 === error.response.status && isCart) store.dispatch(signout(false))
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const getWishlist = async ()=>{
    return await axios.get("/user/wishlist",accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const getCart = async ()=>{
    return await axios.get("/user/cart",accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const addToWishlist = async (wishlist)=>{
    return await axios.post("/user/wishlist",{wishlist},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const isInCart = async (cart)=>{
    return await axios.get("/user/cart/"+cart,accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const isInWishlist = async (wishlist)=>{
    return await axios.get("/user/wishlist/"+wishlist,accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const addToCart = async (cart,dec=false)=>{
    let endpoint = !dec?"/user/cart":"/user/cart?dec=true"
    return await axios.post(endpoint,{cart},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const removeFromWishlist = async (wishlist)=>{
    return await axios.delete("/user/wishlist",{wishlist},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const removeFromCart = async (cart)=>{
    return await axios.delete("/user/cart/"+cart,accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const createOrder = async (amount)=>{
    return await axios.post("/payment/order",{amount,currency:"INR"},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const verifyOrder = async (data)=>{
    return await axios.post("/payment/verify",data,accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)    
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const viewOrderHistory = async ()=>{
    return await axios.get("/user/vieworderhistory",accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)    
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const viewOrder = async (id)=>{
    return await axios.get("/user/vieworder/"+id,accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)    
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const generateQr = async (paymentId)=>{
    return await axios.post("/payment/generate",{paymentId},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)    
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const ratingReview = async (productId,rating,review)=>{
    return await axios.post("/user/ratingandreview/"+productId,{rating,review},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)    
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}
