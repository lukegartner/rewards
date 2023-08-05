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
function* addAwardAdmin(action) {
  try {
    const response = yield fetch("/admin/awarded", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Fetching Admin Awarded");
    }

    yield put({ type: "FETCH_AWARDED_ADMIN" });
  } catch (error) {
    console.log("Awarded POST request failed", error);
  }
}
function* editAwardAdmin(action) {
  try {
    const response = yield fetch("/admin/awarded", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Awarded");
    }

    yield put({ type: "FETCH_AWARDED_ADMIN" });
  } catch (error) {
    console.log("Awarded PUT request failed", error);
  }
}
function* deleteAwardAdmin(action) {
  try {
    const response = yield fetch(`/admin/awarded/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Awarded");
    }

    yield put({ type: "FETCH_AWARDED_ADMIN" });
  } catch (error) {
    console.log("Awarded DELETE request failed", error);
  }
}

function* adminAwardedSaga() {
  yield takeLatest("FETCH_AWARDED_ADMIN", fetchAwardedAdmin);
  yield takeLatest("ADD_AWARD_ADMIN", addAwardAdmin);
  yield takeLatest("EDIT_AWARD_ADMIN", editAwardAdmin);
  yield takeLatest("DELETE_AWARD_ADMIN", deleteAwardAdmin);
}

export default adminAwardedSaga;
