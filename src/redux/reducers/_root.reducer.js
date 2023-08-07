import { combineReducers } from "redux";
import errors from "./errors.reducer";
import me from "./me.reducer";
import rewardsUser from "./rewardsUser.reducer";
import adminUsers from "./admin/users.reducer";
import adminRewards from "./admin/rewards.reducer";
import adminCategories from "./admin/categories.reducer";
import adminRedeemed from "./admin/redeemed.reducer";
import adminAwarded from "./admin/awarded.reducer";
import selectedReward from "./selectedReward.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  me,
  rewardsUser,
  adminUsers,
  adminRewards,
  adminCategories,
  adminRedeemed,
  adminAwarded,
  selectedReward,
});

export default rootReducer;
