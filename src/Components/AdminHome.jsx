import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AdminHome = () => {
  const dispatch = useDispatch();
  const { adminUsers } = useSelector((store) => store);
  console.log("adminUsers", adminUsers);
  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
  }, []);
  return <h1>AdminHome</h1>;
};

export default AdminHome;
