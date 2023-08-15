import React, { useEffect } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const UserHistory = () => {
  const dispatch = useDispatch();
  const { userAwarded, userRedeemed, rewardsUser } = useSelector(
    (store) => store
  );
  const userHistory = [...userAwarded, ...userRedeemed];

  //   Figure out sortig by date
  //   console.log(userHistory.sort((a, b) => b.timestamp - a.timestamp));

  useEffect(() => {
    dispatch({ type: "FETCH_USER_AWARDED", payload: rewardsUser });
    dispatch({ type: "FETCH_USER_REDEEMED", payload: rewardsUser });
  }, []);
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100vw", backgroundImage: "none" }}
    >
      <Typography variant="h6" align="center">
        History
      </Typography>
      <Table sx={{ maxWidth: "100%" }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Desciption</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userHistory.map((row) => {
            const date = new Date(row.timestamp);
            return (
              <TableRow
                key={row.timestamp}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.award_description && row.award_description}
                  {row.reward_title && row.reward_title}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      (row.awarded_value && "green") ||
                      (row.redeemed_value && "red"),
                  }}
                >
                  {row.awarded_value && row.awarded_value}
                  {row.redeemed_value && row.redeemed_value}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.timestamp).toLocaleDateString("en-US")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserHistory;
