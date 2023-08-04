import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGrid from "./DataGrid";
import DataGridCRUD from "./DataGridCRUD";

const AdminRewards = () => {
  const dispatch = useDispatch();
  const { adminRewards } = useSelector((store) => store);
  console.log("rewards from rewards", adminRewards);

  useEffect(() => {
    dispatch({ type: "FETCH_REWARDS_ADMIN" });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "reward_title",
      headerName: "Reward",
      width: 150,
      editable: true,
    },
    {
      field: "reward_value",
      headerName: "Value",
      width: 70,
      editable: true,
    },
    {
      field: "reward_category",
      headerName: "Category",
      width: 120,
      editable: true,
    },
    {
      field: "reward_description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "reward_image",
      headerName: "Image",
      width: 150,
      editable: true,
    },
    {
      field: "reward_count",
      headerName: "Count",
      width: 70,
      editable: true,
    },
    {
      field: "reward_active",
      headerName: "Active",
      width: 70,
      editable: true,
    },
  ];

  return <DataGridCRUD columns={columns} rows={adminRewards} title="Rewards" />;
};

export default AdminRewards;
