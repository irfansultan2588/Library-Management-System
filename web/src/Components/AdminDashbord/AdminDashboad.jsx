import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import LocationSearchingRoundedIcon from "@mui/icons-material/LocationSearchingRounded";
import GroupIcon from "@mui/icons-material/Group";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import "./adminDashboard.css";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import CommonCard from "../homecard/CommonCard";
import Profile from "../profile/Profile";
import Setting from "../Setting/Setting";

const AdminDashboad = () => {
  let param = useParams();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAuth(null);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const _rend = () => {
    switch (param?.type) {
      case "home":
        return <CommonCard />;
      case "profile":
        return <Profile />;
      case "setting":
        return <Setting />;
      default:
        return "Page Not Found";
    }
  };

  const navigetTo = (location) => {
    navigate(location);
  };
  return (
    <div className="admin-main2">
      <Box className="rightside" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {" "}
              <CDBSidebarHeader
                prefix={<i className="fa fa-bars fa-large"></i>}
              >
                <a
                  href="/"
                  className="text-decoration-none library-text"
                  style={{ color: "inherit" }}
                >
                  Library System
                </a>
              </CDBSidebarHeader>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => navigetTo("/dashboard/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigetTo("/dashboard/setting")}>
                    Setting{" "}
                  </MenuItem>
                  <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <div
        className="sideber"
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/tables" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  {" "}
                  <CategoryIcon className="icons" />
                  Category
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  <EditIcon className="icons" />
                  Author
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
                  {" "}
                  <LocationSearchingRoundedIcon className="icons" />
                  Location Rack
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                exact
                to="/hero404"
                target="_blank"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem>
                  <GroupIcon className="icons" />
                  Register User
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem>
                  <LocalLibraryIcon className="icons" />
                  Issue Book
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem>
                  <LogoutIcon className="icons" />
                  Logout
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
        {_rend()}
      </div>
    </div>
  );
};

export default AdminDashboad;
