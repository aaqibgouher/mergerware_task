import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavbarComponent from "../components/helpers/NavbarComponent";
import SidebarComponent from "../components/helpers/SidebarComponent";
import DashbordComponent from "../components/dashboard/DashboardComponent";
import { useDispatch } from "react-redux";
import { getLoansAction, getMeAction } from "../actions/userAction";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();

  const getMe = async () => {
    try {
      await dispatch(getMeAction());
    } catch (error) {
      console.log(error, "from get me dashboard layout");
    }
  };

  const getLoans = async () => {
    try {
      await dispatch(getLoansAction());
    } catch (error) {
      console.log(error, "from get loans dashboard layout component");
    }
  };

  useEffect(() => {
    getMe();
    getLoans();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavbarComponent />
        <SidebarComponent />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
