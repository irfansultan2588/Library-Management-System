import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "../../Context";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CreateRack from "./createLocationRack/CreateRack";
import ListRack from "./ListLocationRack/ListRack";
import UpdateRack from "./UpdateRack/UpdateRack";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Irfan Library Management Website ❤️
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LocationRack = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [page, setPage] = useState(false);
  const [details, setdetails] = useState(false);

  return (
    <div>
      {state?.user === null ? (
        <div> Loading... </div>
      ) : (
        <div className="categoryMain">
          <div className="profileDiv">
            <div className="userHead">
              <h2>Location Rack Management</h2>
            </div>

            <div className="setting-haed">
              <h5>
                <a href="#"> Dashboard</a>{" "}
                <span>/ Location Rack Management</span>
              </h5>
            </div>
            {!page && (
              <div className="from-man">
                <div className="main-category">
                  <div className="edit-setting-hadding">
                    <h5>
                      {" "}
                      <CalendarViewMonthIcon />
                      Location Rack Management
                    </h5>
                  </div>
                  <div className="btn-con">
                    <button className="btn-add" onClick={() => setPage(true)}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
            {page ? (
              <CreateRack />
            ) : details ? (
              <UpdateRack details={details} />
            ) : (
              <ListRack setdetails={setdetails} />
            )}
          </div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      )}
    </div>
  );
};

export default LocationRack;
