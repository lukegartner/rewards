import { put, takeLatest } from "redux-saga/effects";

function* fetchAwardedAdmin(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch("/admin/awarded");
    if (!response.ok) {
      throw new Error("Error Fetching Admin Awarded");
    }
    const adminAwarded = yield response.json();

    yield put({ type: "SET_AWARDED_ADMIN", payload: adminAwarded });
  } catch (error) {
    console.log("Awarded get request failed", error);
  }
}

function* adminAwardedSaga() {
  yield takeLatest("FETCH_AWARDED_ADMIN", fetchAwardedAdmin);
}

export default adminAwardedSaga;
