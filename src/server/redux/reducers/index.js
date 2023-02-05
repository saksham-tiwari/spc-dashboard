import { combineReducers } from "redux";
import loading from "./loading";
import user from "./user";
import cart from "./cart";

export default combineReducers({
    loading,
    user,
    cart
})