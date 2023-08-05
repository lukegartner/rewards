import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGrid from "./DataGrid";
import DataGridCRUD from "./DataGridCRUD";

const AdminRewards = () => {
  const dispatch = useDispatch();
  const { adminRewards, adminCategories } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_REWARDS_ADMIN" });
    dispatch({ type: "FETCH_CATEGORIES_ADMIN" });
  }, []);

  // Dispatch types for editing rewards table in database
  const dispatchTypes = {
    ADD: "ADD_REWARD_ADMIN",
    EDIT: "EDIT_REWARD_ADMIN",
    DELETE: "DELETE_REWARD_ADMIN",
  };

  // Single select column selection options
  const categoryOptions = adminCategories.map((category) => {
    return { value: category.id, label: category.reward_category };
  });
  const activeOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];
  // These are the columns for the DataGrid on Rewards page
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
      type: "number",
    },
    {
      field: "category_id",
      headerName: "Category",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: categoryOptions,
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
      type: "number",
    },
    {
      field: "reward_active",
      headerName: "Active",
      width: 70,
      editable: true,
      type: "singleSelect",
      valueOptions: activeOptions,
    },
  ];

  return (
    <DataGridCRUD
      columns={columns}
      rows={adminRewards}
      title="Rewards"
      rowTitle="Reward"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default AdminRewards;
