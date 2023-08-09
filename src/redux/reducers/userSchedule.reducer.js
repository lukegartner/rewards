const userScheduleReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_SCHEDULE":
      return action.payload;
    case "UNSET_USER_SCHEDULE":
      return {};
    default:
      return state;
  }
};

export default userScheduleReducer;
