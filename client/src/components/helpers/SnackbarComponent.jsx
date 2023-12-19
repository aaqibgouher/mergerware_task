import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import { SET_SNACKBAR } from "../../types";

const SnackbarComponent = () => {
  let snackbarState = useSelector((state) => state.userReducer.snackbar);
  let dispatch = useDispatch();

  setTimeout(() => {
    dispatch({ type: SET_SNACKBAR, payload: null });
  }, 5000);

  return (
    <>
      <Snackbar
        open={snackbarState?.open}
        message={snackbarState?.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
};

export default SnackbarComponent;
