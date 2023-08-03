import { put, takeLatest } from "redux-saga/effects";

function* fetchRedeemedAdmin(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch("/admin/redeemed");
    if (!response.ok) {
      throw new Error("Error Fetching Admin Redeemed");
    }
    const adminRedeemed = yield response.json();

    yield put({ type: "SET_REDEEMED_ADMIN", payload: adminRedeemed });
  } catch (error) {
    console.log("Redeemed get request failed", error);
  }
}

function* adminRedeemedSaga() {
  yield takeLatest("FETCH_REDEEMED_ADMIN", fetchRedeemedAdmin);
}

export default adminRedeemedSaga;
