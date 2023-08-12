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
function* addCategoryAdmin(action) {
  try {
    const response = yield fetch("/admin/categories", {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Fetching Admin Categories");
    }

    yield put({ type: "FETCH_CATEGORIES_ADMIN" });
  } catch (error) {
    console.log("categories POST request failed", error);
  }
}
function* editCategoryAdmin(action) {
  try {
    const response = yield fetch("/admin/categories", {
      method: "PUT",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Category");
    }

    yield put({ type: "FETCH_CATEGORIES_ADMIN" });
  } catch (error) {
    console.log("Categories PUT request failed", error);
  }
}
function* deleteCategoryAdmin(action) {
  try {
    const response = yield fetch(`/admin/categories/${action.payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error Editing Admin Category");
    }

    yield put({ type: "FETCH_CATEGORIES_ADMIN" });
  } catch (error) {
    console.log("Categoires DELETE request failed", error);
  }
}

function* adminCategoriesSaga() {
  yield takeLatest("FETCH_CATEGORIES_ADMIN", fetchCategoriesAdmin);
  yield takeLatest("ADD_CATEGORY_ADMIN", addCategoryAdmin);
  yield takeLatest("EDIT_CATEGORY_ADMIN", editCategoryAdmin);
  yield takeLatest("DELETE_CATEGORY_ADMIN", deleteCategoryAdmin);
}

export default adminCategoriesSaga;
