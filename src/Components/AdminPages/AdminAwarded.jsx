import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const AdminAwarded = () => {
  const dispatch = useDispatch();
  const { adminAwarded, adminUsers } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_AWARDED_ADMIN" });
    dispatch({ type: "FETCH_USERS_ADMIN" });
    dispatch({ type: "FETCH_REWARDS_ADMIN" });
  }, []);

  // Dispatch types for editing rewards table in database
  const dispatchTypes = {
    ADD: "ADD_AWARD_ADMIN",
    EDIT: "EDIT_AWARD_ADMIN",
    DELETE: "DELETE_AWARD_ADMIN",
  };

  // Single select column selection options
  const userOptions = adminUsers.map((user) => {
    return { value: user.id, label: user.username };
  });

  // These are the columns for the DataGrid on Rewards page
  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "user_id",
      headerName: "Username",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: userOptions,
    },
    {
      field: "awarded_value",
      headerName: "Value",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "service_id",
      headerName: "Service ID",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "award_description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "timestamp",
      headerName: "Date",
      width: 120,
      editable: false,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }
        return `${new Date(params.value).toLocaleDateString("en-US")} `;
      },
    },
  ];

  return (
    <DataGridCRUD
      columns={columns}
      rows={adminAwarded}
      title="Awarded"
      rowTitle="Award"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default AdminAwarded;
