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

export default adminUsersReducer;
