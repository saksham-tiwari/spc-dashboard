import { logout } from "../../services/auth/auth.service";
import { SET_USER } from "./types";
  
export const setUser = (isUser) => ({
  type: SET_USER,
  payload: isUser,  
});
export const signout = (cond) => (dispatch) => {
  console.log("signout called")
  dispatch({
    type: SET_USER,
    payload: false
  });
  logout(cond)
  };