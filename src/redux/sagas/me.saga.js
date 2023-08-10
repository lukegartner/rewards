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
    yield put({
      type: "FETCH_REWARDS_USER",
      payload: { ...action.payload, avatar: me.data.attributes.avatar },
    });
  } catch (error) {
    console.log("User get request failed", error);
  }
}
function* fetchUserSchedule(action) {
  try {
    const response = yield fetch(
      `/auth/schedule/${action.payload.pco_id.split("|").pop()}`
    );
    if (!response.ok) {
      throw new Error("Error Fetching User Schedule");
    }
    const userSchedule = yield response.json();

    yield put({ type: "SET_USER_SCHEDULE", payload: userSchedule.data });
    // Add points for new confirmations
    for (let service of userSchedule.data) {
      console.log("Is ut C?", service.attributes.status);
      if (
        !action.payload.userAwarded.some(
          (award) => Number(service.id) === Number(award.service_id)
        ) &&
        service.attributes.status === "C"
      ) {
        yield put({
          type: "ADD_AWARD_ADMIN",
          payload: {
            user_id: action.payload.rewardsUser.id,
            awarded_value: 20,
            service_id: service.id,
            award_description: `${service.attributes.service_type_name}, ${service.attributes.short_dates}, ${service.attributes.team_name}, ${service.attributes.team_position_name} `,
          },
        });
        yield put({
          type: "EDIT_USER_ADMIN",
          payload: {
            ...action.payload.rewardsUser,
            balance: action.payload.rewardsUser.balance + 20,
          },
        });
        yield put({ type: "FETCH_REWARDS_USER", payload: action.payload });
      }
    }
  } catch (error) {
    console.log("User Schedule get request failed", error);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_ME", fetchMe);
  yield takeLatest("FETCH_USER_SCHEDULE", fetchUserSchedule);
}

export default userSaga;
