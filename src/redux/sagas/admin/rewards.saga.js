import { put, takeLatest } from "redux-saga/effects";

function* fetchRewardsAdmin(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch("/admin/rewards");
    if (!response.ok) {
      throw new Error("Error Fetching Admin Rewards");
    }
    const adminRewards = yield response.json();

    yield put({ type: "SET_REWARDS_ADMIN", payload: adminRewards });
  } catch (error) {
    console.log("Rewards get request failed", error);
  }
}

function* adminRewardsSaga() {
  yield takeLatest("FETCH_REWARDS_ADMIN", fetchRewardsAdmin);
}

export default adminRewardsSaga;
