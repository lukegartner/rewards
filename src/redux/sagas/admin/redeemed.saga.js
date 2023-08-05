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
function* addRedemptionAdmin(action) {
  try {
    const response = yield fetch("/admin/redeemed", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Adding Admin Redemption");
    }

    yield put({ type: "FETCH_REDEEMED_ADMIN" });
  } catch (error) {
    console.log("Redeemed POST request failed", error);
  }
}
function* editRedemptionAdmin(action) {
  try {
    const response = yield fetch("/admin/redeemed", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Redeemed");
    }

    yield put({ type: "FETCH_REDEEMED_ADMIN" });
  } catch (error) {
    console.log("Redeemed PUT request failed", error);
  }
}
function* deleteRedemptionAdmin(action) {
  try {
    const response = yield fetch(`/admin/redeemed/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Redemption");
    }

    yield put({ type: "FETCH_REDEEMED_ADMIN" });
  } catch (error) {
    console.log("Redeemed DELETE request failed", error);
  }
}

function* adminRedeemedSaga() {
  yield takeLatest("FETCH_REDEEMED_ADMIN", fetchRedeemedAdmin);
  yield takeLatest("ADD_REDEMPTION_ADMIN", addRedemptionAdmin);
  yield takeLatest("EDIT_REDEMPTION_ADMIN", editRedemptionAdmin);
  yield takeLatest("DELETE_REDEMPTION_ADMIN", deleteRedemptionAdmin);
}

export default adminRedeemedSaga;
