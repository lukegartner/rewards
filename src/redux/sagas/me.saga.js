import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchMe(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch(`/auth/token/${action.payload.pco_id}`);
    if (!response.ok) {
      throw new Error("Error Fetching Access Token");
    }
    const meResponse = yield fetch("/auth/me");
    const me = yield meResponse.json();

    yield put({ type: "SET_ME", payload: me.data });
    yield put({ type: "FETCH_REWARDS_USER", payload: action.payload });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_ME", fetchMe);
}

export default userSaga;
