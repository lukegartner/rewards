import { put, takeLatest } from "redux-saga/effects";

function* fetchRewardsAdmin(action) {
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
function* addRewardAdmin(action) {
  try {
    const response = yield fetch("/admin/rewards", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Fetching Admin Rewards");
    }

    yield put({ type: "FETCH_REWARDS_ADMIN" });
  } catch (error) {
    console.log("Rewards POST request failed", error);
  }
}
function* editRewardAdmin(action) {
  try {
    const response = yield fetch("/admin/rewards", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Reward");
    }

    yield put({ type: "FETCH_REWARDS_ADMIN" });
  } catch (error) {
    console.log("Rewards PUT request failed", error);
  }
}
function* deleteRewardAdmin(action) {
  try {
    const response = yield fetch(`/admin/rewards/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Reward");
    }

    yield put({ type: "FETCH_REWARDS_ADMIN" });
  } catch (error) {
    console.log("Rewards DELETE request failed", error);
  }
}

function* adminRewardsSaga() {
  yield takeLatest("FETCH_REWARDS_ADMIN", fetchRewardsAdmin);
  yield takeLatest("ADD_REWARD_ADMIN", addRewardAdmin);
  yield takeLatest("EDIT_REWARD_ADMIN", editRewardAdmin);
  yield takeLatest("DELETE_REWARD_ADMIN", deleteRewardAdmin);
}

export default adminRewardsSaga;
