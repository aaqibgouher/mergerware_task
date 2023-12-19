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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { SET_DIALOG } from "../../types";
import { ASK_LOAN, roles, status } from "../../utils/constant";
import { useEffect, useState } from "react";
import { updateLoanStatusAction } from "../../actions/userAction";

const BorrowerComponent = () => {
  const dispatch = useDispatch();
  const loansState = useSelector((state) => state.userReducer.loans);
  const meState = useSelector((state) => state.userReducer.me);
  const [loans, setLoans] = useState([]);

  const askLoan = async () => {
    // open model
    await dispatch({
      type: SET_DIALOG,
      payload: { open: true, title: "Ask loan", type: ASK_LOAN },
    });
  };

  const handleStatusChange = async (payload) => {
    try {
      console.log(payload, "handle");
      //   update status in the db
      const res = await dispatch(
        updateLoanStatusAction({
          loanId: payload.loanId,
          borrowerId: payload.borrowerId,
          status: payload.status,
        })
      );
    } catch (error) {
      console.log(error, "from handle status change");
    }
  };

  useEffect(() => {
    if (loansState && loansState.length) {
      setLoans(loansState);
    }
  }, [loansState]);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box flex="1">
          <h1>Loans</h1>
        </Box>
        {meState?.role === roles.BORROWER ? (
          <Box>
            <Button variant="contained" onClick={askLoan}>
              <AddIcon />
            </Button>
          </Box>
        ) : null}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Borrower</TableCell>
              <TableCell>Lender</TableCell>
              <TableCell align="right">Amount</TableCell>
              {meState?.role !== roles.BORROWER ? (
                <TableCell>Status (Action)</TableCell>
              ) : (
                <TableCell>Status (From Lender)</TableCell>
              )}
              <TableCell>Returned</TableCell>
              <TableCell>Last date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans && loans.length ? (
              loans.map((loan) => (
                <TableRow
                  key={loan._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {loan.borrower.name}
                  </TableCell>
                  <TableCell>{loan.lender.name}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <Chip label={loan.amount} color="success" />
                  </TableCell>
                  {meState?.role !== roles.BORROWER ? (
                    <TableCell>
                      <Select
                        value={loan.status}
                        size="small"
                        onChange={(e) =>
                          handleStatusChange({
                            loanId: loan._id,
                            borrowerId: loan.borrower._id,
                            status: e.target.value,
                          })
                        }
                      >
                        {Object.values(status).map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ) : (
                    <TableCell>
                      {loan.status === status.APPROVED && (
                        <Chip label={loan.status} color="success" />
                      )}
                      {loan.status === status.PENDING && (
                        <Chip label={loan.status} color="warning" />
                      )}
                      {loan.status === status.REJECTED && (
                        <Chip label={loan.status} color="error" />
                      )}
                    </TableCell>
                  )}

                  <TableCell>
                    {loan.returned ? (
                      <Chip label={<DoneIcon />} color="success" />
                    ) : (
                      <Chip label={<CloseIcon />} color="error" />
                    )}
                  </TableCell>
                  <TableCell>{loan.submission_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BorrowerComponent;
