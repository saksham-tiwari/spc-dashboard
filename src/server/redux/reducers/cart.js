import { ADD_CART, REMOVE_CART, SET_CART } from "../actions/types";

const initialState = [];

const cart = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CART:
      return  payload;

    case ADD_CART:
        return [...state,{quantity:1,product:payload,_id:"123456789"}];
    case REMOVE_CART:
        console.log(payload);
        return state.filter(s=>s.product._id!==payload)

    default:
      return state;
  }
}

export default cart