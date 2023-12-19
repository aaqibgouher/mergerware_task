import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const SidebarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bars, setBars] = useState([]);
  const sidebarState = useSelector((state) => state.userReducer.sidebar);

  const handleBar = async (bar) => {
    switch (bar) {
      case "HOME":
        console.log("from home");
        break;
      case "PROFILE":
        console.log("from profile");
        break;
      case "LOGOUT":
        console.log("from logout");
        await logout();
      default:
        console.log("default");
    }
  };

  const logout = async () => {
    try {
      const res = await dispatch(logoutAction());

      if (!res || res.status !== 200) throw "Something went wrong";

      // redirect to login
      navigate("/login");
    } catch (error) {
      console.log(error, "from logout");
    }
  };

  useEffect(() => {
    if (sidebarState && sidebarState.length) {
      setBars(sidebarState);
      console.log(sidebarState, "sidebar");
    }
  }, [sidebarState]);

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {bars && bars.length ? (
            bars.map((bar) => (
              <ListItem key={bar.id} disablePadding>
                <ListItemButton onClick={() => handleBar(bar.value)}>
                  <ListItemIcon>
                    {bar.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={bar.name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <>Nothing</>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default SidebarComponent;
