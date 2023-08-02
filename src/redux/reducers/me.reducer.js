const meReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ME":
      return action.payload;
    case "UNSET_ME":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default meReducer;
