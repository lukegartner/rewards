import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* postRewardsUser(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch(`/rewards-user`, {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error posting rewards user");
    }

    yield put({ type: "FETCH_REAWARDS_USER" });
  } catch (error) {
    console.log("Post rewards user failed", error);
  }
}
function* fetchRewardsUser(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch(`/rewards-user/${action.payload.pco_id}`);
    if (!response.ok) {
      throw new Error("Error fetching rewards user");
    }
    const rewardsUser = yield response.json();
    if (rewardsUser.length === 1) {
      yield put({ type: "SET_REWARDS_USER", payload: rewardsUser[0] });
    }
    if (rewardsUser.length === 0) {
      yield put({ type: "POST_REWARDS_USER", payload: action.payload });
    }
  } catch (error) {
    console.log("Fetch rewards user failed", error);
  }
}

function* rewardsUserSaga() {
  yield takeLatest("POST_REWARDS_USER", postRewardsUser);
  yield takeLatest("FETCH_REWARDS_USER", fetchRewardsUser);
}

export default rewardsUserSaga;
