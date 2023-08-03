// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  // "reward_image" VARCHAR (255),
  //     "reward_active" BOOLEAN NOT NULL,
  //     "reward_count" INT NOT NULL
  // );
  return (
    <Box sx={{ height: 400, width: "100%", mt: "3rem" }}>
      <Typography variant="h2" align="center">
        Rewards
      </Typography>
      <DataGrid
        rows={adminRewards}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default AdminRewards;
