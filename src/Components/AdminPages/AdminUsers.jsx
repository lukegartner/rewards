import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { adminUsers } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_USERS_ADMIN" });
  }, []);

  // Dispatch types for editing users table in database
  const dispatchTypes = {
    ADD: "ADD_USER_ADMIN",
    EDIT: "EDIT_USER_ADMIN",
    DELETE: "DELETE_USER_ADMIN",
  };

  // Single select column selection options
  const adminOptions = [
    { value: true, label: "Admin" },
    { value: false, label: "User" },
  ];
  // These are the columns for the DataGrid on Users page
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
      type: "number",
    },
    {
      field: "admin",
      headerName: "Type",
      width: 70,
      editable: true,
      type: "singleSelect",
      valueOptions: adminOptions,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      editable: true,
    },
  ];

  return (
    <DataGridCRUD
      columns={columns}
      rows={adminUsers}
      title="Users"
      rowTitle="User"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default AdminUsers;
