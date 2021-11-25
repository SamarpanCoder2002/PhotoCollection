import initialState from "./initial-state";
import { SEARCH_KEYWORD, START_LOADING, STOP_LOADING } from "./actions";

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SEARCH_KEYWORD:
      

      const newState = { ...state, query: action.payload };
      return newState;

    case START_LOADING:
      const newState2 = { ...state, isLoading: true };
      return newState2;

    case STOP_LOADING:
      const newState3 = { ...state, isLoading: false };
      return newState3;

    default:
      return state;
  }
};

export default reducer;
