const selectedRewardReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_REWARD":
      return action.payload;
    case "UNSET_SELECTED_REWARD":
      return {};
    default:
      return state;
  }
};

export default selectedRewardReducer;
