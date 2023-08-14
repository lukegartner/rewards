import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const AdminRedeemed = () => {
  const dispatch = useDispatch();
  const { adminRedeemed, adminUsers, adminRewards } = useSelector(
    (store) => store
  );

  useEffect(() => {
    dispatch({ type: "FETCH_REDEEMED_ADMIN" });
    dispatch({ type: "FETCH_USERS_ADMIN" });
    dispatch({ type: "FETCH_REWARDS_ADMIN" });
  }, []);

  // Dispatch types for editing rewards table in database
  const dispatchTypes = {
    ADD: "ADD_REDEMPTION_ADMIN",
    EDIT: "EDIT_REDEMPTION_ADMIN",
    DELETE: "DELETE_REDEMPTION_ADMIN",
  };

  // Single select column selection options
  const rewardOptions = adminRewards.map((reward) => {
    return { value: reward.id, label: reward.reward_title };
  });
  const completeOptions = [
    { value: true, label: "Complete" },
    { value: false, label: "Pending" },
  ];
  const userOptions = adminUsers.map((user) => {
    return { value: user.id, label: user.username };
  });
  // These are the columns for the DataGrid on Rewards page
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "complete",
      headerName: "Status",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: completeOptions,
    },
    {
      field: "user_id",
      headerName: "Username",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: userOptions,
    },
    {
      field: "reward_id",
      headerName: "Reward",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: rewardOptions,
    },
    {
      field: "redeemed_value",
      headerName: "Value",
      width: 100,
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
      rows={adminRedeemed}
      title="Redeemed"
      rowTitle="Redemtion"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default AdminRedeemed;
