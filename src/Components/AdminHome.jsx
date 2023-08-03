import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AdminHome = () => {
  const dispatch = useDispatch();
  const { adminUsers, adminRewards } = useSelector((store) => store);
  console.log("adminUsers", adminUsers);
  console.log("adminRewards", adminRewards);
  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
    dispatch({ type: "FETCH_REWARDS_ADMIN" });
  }, []);
  return <h1>AdminHome</h1>;
};

export default AdminHome;
