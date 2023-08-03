import { put, takeLatest } from "redux-saga/effects";

function* fetchUsersAdmin(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch("/admin/users");
    if (!response.ok) {
      throw new Error("Error Fetching Admin Users");
    }
    const adminUsers = yield response.json();

    yield put({ type: "SET_USERS_ADMIN", payload: adminUsers });
  } catch (error) {
    console.log("Users get request failed", error);
  }
}

function* adminUsersSaga() {
  yield takeLatest("FETCH_USERS_ADMIN", fetchUsersAdmin);
}

export default adminUsersSaga;
