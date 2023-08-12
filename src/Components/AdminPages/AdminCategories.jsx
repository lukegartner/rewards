import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataGridCRUD from "./DataGridCRUD";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const { adminCategories } = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES_ADMIN" });
  }, []);

  // Dispatch types for editing users table in database
  const dispatchTypes = {
    ADD: "ADD_CATEGORY_ADMIN",
    EDIT: "EDIT_CATEGORY_ADMIN",
    DELETE: "DELETE_CATEGORY_ADMIN",
  };

  // Single select column selection options
  const activeOptions = [
    { value: true, label: "Active" },
    { value: false, label: "Innactive" },
  ];
  // These are the columns for the DataGrid on Users page
  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "reward_category",
      headerName: "Category",
      width: 150,
      editable: true,
    },
    {
      field: "category_active",
      headerName: "Status",
      width: 90,
      editable: true,
      type: "singleSelect",
      valueOptions: activeOptions,
    },
  ];

  return (
    <DataGridCRUD
      columns={columns}
      rows={adminCategories.filter(({ id }) => id !== 0)}
      title="Categories"
      rowTitle="category"
      dispatchTypes={dispatchTypes}
    />
  );
};

export default AdminCategories;
