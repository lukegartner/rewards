import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGrid from "./DataGrid";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { adminUsers } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: true,
    },
    {
      field: "pco_id",
      headerName: "Planning Center ID",
      width: 190,
      editable: true,
    },
    {
      field: "balance",
      headerName: "Point Balance",
      width: 120,
      editable: true,
    },
    {
      field: "admin",
      headerName: "Admin",
      width: 150,
      editable: true,
    },
  ];

  return <DataGrid columns={columns} rows={adminUsers} title="Users" />;
};

export default AdminUsers;
