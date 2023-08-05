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
function* addUserAdmin(action) {
  try {
    const response = yield fetch("/admin/users", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Fetching Admin Users");
    }

    yield put({ type: "FETCH_USERS_ADMIN" });
  } catch (error) {
    console.log("Users POST request failed", error);
  }
}
function* editUserAdmin(action) {
  try {
    const response = yield fetch("/admin/users", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin User");
    }

    yield put({ type: "FETCH_USERS_ADMIN" });
  } catch (error) {
    console.log("Users PUT request failed", error);
  }
}
function* deleteUserAdmin(action) {
  try {
    const response = yield fetch(`/admin/users/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin User");
    }

    yield put({ type: "FETCH_USERS_ADMIN" });
  } catch (error) {
    console.log("Users DELETE request failed", error);
  }
}
function* adminUsersSaga() {
  yield takeLatest("FETCH_USERS_ADMIN", fetchUsersAdmin);
  yield takeLatest("ADD_USER_ADMIN", addUserAdmin);
  yield takeLatest("EDIT_USER_ADMIN", editUserAdmin);
  yield takeLatest("DELETE_USER_ADMIN", deleteUserAdmin);
}

export default adminUsersSaga;
