const adminUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USERS_ADMIN":
      return action.payload;
    case "UNSET_USERS_ADMIN":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default adminUsersReducer;
