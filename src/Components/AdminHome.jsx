import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AdminHome = () => {
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
  return <h1>AdminHome</h1>;
};

export default AdminHome;
