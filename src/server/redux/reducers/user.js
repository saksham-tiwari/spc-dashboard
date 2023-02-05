import { SET_USER } from "../actions/types";

const initialState = {isUser:false};

const user = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { isUser: payload };

    default:
      return state;
  }
}

export default user