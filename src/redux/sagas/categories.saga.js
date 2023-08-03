import { put, takeLatest } from "redux-saga/effects";

function* fetchCategoriesAdmin(action) {
  console.log("payload", action.payload);
  try {
    const response = yield fetch("/admin/rewards/categories");
    if (!response.ok) {
      throw new Error("Error Fetching Admin Categories");
    }
    const adminCategories = yield response.json();

    yield put({ type: "SET_CATEGORIES_ADMIN", payload: adminCategories });
  } catch (error) {
    console.log("Categories get request failed", error);
  }
}

function* adminCategoriesSaga() {
  yield takeLatest("FETCH_CATEGORIES_ADMIN", fetchCategoriesAdmin);
}

export default adminCategoriesSaga;
