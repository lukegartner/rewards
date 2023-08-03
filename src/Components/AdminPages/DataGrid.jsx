import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

const AdminDataGrid = ({ title, columns, rows }) => {
  return (
    <Box sx={{ height: 400, width: "100%", mt: "3rem" }}>
      <Typography variant="h2" align="center">
        {title}
      </Typography>
      <DataGrid
        rows={rows}
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

export default AdminDataGrid;
