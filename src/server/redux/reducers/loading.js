import { SET_LOADING } from "../actions/types";

const initialState = {loading:false};

const loading = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { loading: payload };

    default:
      return state;
  }
}

export default loading