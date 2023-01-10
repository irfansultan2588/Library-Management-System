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
import axios from "axios";
import { GlobalContext } from "../../Context";
import { useContext } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
import Category from "../Category/Category";
import Author from "../Author/Author";
import LocationRack from "../Location Rack/LocationRack";
import Book from "../Books/Book";
import RegisterUser from "../RegisterUser/RegisterUser";
import IssueBook from "../Issue Book/IssueBook";
import Home from "../Home/Home";

const AdminDashboad = () => {
  let { state, dispatch } = useContext(GlobalContext);
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

  const logouthandler = async () => {
    try {
      let response = await axios.post(
        `${state.baseUrl}/logout`,
        {},

        {
          withCredentials: true,
        }
      );
      dispatch({ type: "USER_LOGOUT" });
      navigate("/");
    } catch (e) {
      console.log("Error in api", e);
    }
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
      case "category":
        return <Category />;
      case "author":
        return <Author />;
      case "locationRack":
        return <LocationRack />;
      case "book":
        return <Book />;
      case "registerUser":
        return <RegisterUser />;
      case "issuebook":
        return <IssueBook />;
      case "logout":
        return <Home />;
      default:
        return "Page Not Found";
    }
  };

  const navigetTo = (location) => {
    navigate(location);
  };
  return (
    <div className="admin-main2">
      <Box className="rightside">
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
                  <MenuItem onClick={logouthandler}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <div className="sideber">
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                exact
                to="/dashboard/home"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/dashboard/category"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem>
                  {" "}
                  <CategoryIcon className="icons" />
                  Category
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/dashboard/author"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem>
                  {" "}
                  <EditIcon className="icons" />
                  Author
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/dashboard/locationRack"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem>
                  {" "}
                  <LocationSearchingRoundedIcon className="icons" />
                  Location Rack
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                exact
                to="/dashboard/book"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem>
                  {" "}
                  <MenuBookIcon className="icons" />
                  Book
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                exact
                to="/dashboard/registerUser"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem>
                  <GroupIcon className="icons" />
                  Register User
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to="/dashboard/issuebook"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem>
                  <LocalLibraryIcon className="icons" />
                  Issue Book
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/home" activeClassName="activeClicked">
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
