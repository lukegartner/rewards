const adminCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CATEGORIES_ADMIN":
      return action.payload;
    case "UNSET_CATEGORIES_ADMIN":
      return {};
    default:
      return state;
  }
};

export default adminCategoriesReducer;
