import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const createData = (borrower, lender, amount, status, returned, last_date) => {
  return { borrower, lender, amount, status, returned, last_date };
};

const LenderComponent = () => {
  const [rows, setRows] = useState([
    createData("Ajay", "Aaqib", 2000, true, false, "Dec 20, 2023"),
    createData("Ajay", "Gouher", 4000, false, false, "Dec 20, 2023"),
  ]);

  return (
    <>
      <h1>Lender</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Lender</TableCell>
              <TableCell>Borrower</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status (From Borrower)</TableCell>
              <TableCell>Returned</TableCell>
              <TableCell>Last date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.borrower}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.borrower}
                </TableCell>
                <TableCell>{row.lender}</TableCell>
                <TableCell align="right">
                  {" "}
                  <Chip label={row.amount} color="success" />
                </TableCell>
                <TableCell>
                  {row.status ? (
                    <Chip label={<DoneIcon />} color="success" />
                  ) : (
                    <Chip label={<CloseIcon />} color="error" />
                  )}
                </TableCell>
                <TableCell>
                  {row.returned ? (
                    <Chip label={<DoneIcon />} color="success" />
                  ) : (
                    <Chip label={<CloseIcon />} color="error" />
                  )}
                </TableCell>
                <TableCell>{row.last_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LenderComponent;
