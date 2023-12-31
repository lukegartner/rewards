const rewardsUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_REWARDS_USER":
      return action.payload;
    case "UNSET_REWARDS_USER":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default rewardsUserReducer;
