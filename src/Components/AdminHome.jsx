import { Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdminRewards from "./AdminPages/AdminRewards";
import AdminUsers from "./AdminPages/AdminUsers";

const AdminHome = () => {
  const { path } = useRouteMatch();
  console.log(`${path}/rewards`);
  const dispatch = useDispatch();
  const {
    adminUsers,
    adminRewards,
    adminCategories,
    adminRedeemed,
    adminAwarded,
  } = useSelector((store) => store);
  console.log("adminUsers", adminUsers);
  console.log("adminRewards", adminRewards);
  console.log("adminCategories", adminCategories);
  console.log("adminAwarded", adminAwarded);
  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
    dispatch({ type: "FETCH_REWARDS_ADMIN" });
    dispatch({ type: "FETCH_CATEGORIES_ADMIN" });
    dispatch({ type: "FETCH_REDEEMED_ADMIN" });
    dispatch({ type: "FETCH_AWARDED_ADMIN" });
  }, []);

  // Build reward or user table
  return (
    <div>
      <Route path={path} exact>
        <h1>Admin Home</h1>
        <h1>Hi Home</h1>
        <h1>Admin Home</h1>
      </Route>
      <Route path={`${path}/rewards`} exact>
        <AdminRewards />
      </Route>
      <Route path={`${path}/users`} exact>
        <AdminUsers />
      </Route>
    </div>
  );
};

export default AdminHome;
