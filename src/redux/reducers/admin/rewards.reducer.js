const adminRewardsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_REWARDS_ADMIN":
      return action.payload;
    case "UNSET_REWARDS_ADMIN":
      return {};
    default:
      return state;
  }
};

export default adminRewardsReducer;
