import { logout } from "../../services/auth/auth.service";
import { addToCart, getCart, removeFromCart } from "../../services/user/user.service";
import { ADD_CART, REMOVE_CART, SET_CART, SET_LOADING, SET_USER } from "./types";

export const loadCart = (isUser) => (dispatch) =>{
    dispatch({
        type: SET_LOADING,
        payload: true
    })
    return getCart()
    .then(res=>{
        dispatch({
            type: SET_LOADING,
            payload: false
        })
        dispatch({
            type: SET_CART,
            payload: res.data.cart
        })
        return Promise.resolve(res)
    })
    .catch(err=>{
        dispatch({
            type: SET_LOADING,
            payload: false
        })
        console.log(err);
        return Promise.reject(err)
    })
}

export const addCart = (cart,dec=false,product)=>dispatch=>{
    return addToCart(cart,dec)
    .then((res)=>{
        dispatch({
            type:ADD_CART,
            payload: product
        })
        return Promise.resolve(res)
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}

export const removeCart = (cart,productId)=>dispatch=>{
    return removeFromCart(cart)
    .then((res)=>{
        dispatch({
            type:REMOVE_CART,
            payload: productId
        })
        return Promise.resolve(res)
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}
export const signout = (cond) => (dispatch) => {
    logout(cond)
    dispatch({
      type: SET_USER,
      payload: false
    });
  };