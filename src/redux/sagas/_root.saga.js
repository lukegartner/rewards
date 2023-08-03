import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import meSaga from "./me.saga";
import rewardsUserSaga from "./rewardsUser.saga";
import adminUsersSaga from "./admin/users.saga";
import adminRewardsSaga from "./admin/rewards.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    meSaga(),
    rewardsUserSaga(),
    adminUsersSaga(),
    adminRewardsSaga(),
  ]);
}
