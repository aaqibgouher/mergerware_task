import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useSelector, useDispatch } from "react-redux";
import { getLendersAction, requestLoanAction } from "../../actions/userAction";

const AskLoanComponent = () => {
  const dispatch = useDispatch();
  const lendersState = useSelector((state) => state.userReducer.lenders);
  const [lender, setLender] = useState("");
  const [open, setOpen] = useState(true);
  const [lenders, setLenders] = useState([]);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const getLenders = async () => {
    try {
      await dispatch(getLendersAction());
    } catch (error) {
      console.log(error, "from get lenders component");
    }
  };

  const askLoan = async () => {
    try {
      const res = await dispatch(
        requestLoanAction({ lenderId: lender, amount, date })
      );
    } catch (error) {
      console.log(error, "from ask loan");
    }
  };

  useEffect(() => {
    getLenders();
  }, []);

  useEffect(() => {
    if (lendersState && lendersState.length) {
      setLenders(lendersState);
    }
  }, [lendersState]);

  return (
    <>
      <div>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Lenders</InputLabel>
          <Select
            label="Lenders"
            name="lenders"
            value={lender}
            onChange={(e) => setLender(e.target.value)}
          >
            {lenders && lenders.length ? (
              lenders.map((lender) => (
                <MenuItem key={lender._id} value={lender._id}>
                  {lender.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem>No lenders found</MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          type="number"
          name="amount"
          fullWidth
          margin="normal"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          type="date"
          name="date"
          fullWidth
          margin="normal"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={askLoan}
        >
          Ask
        </Button>
      </div>
    </>
  );
};

export default AskLoanComponent;
