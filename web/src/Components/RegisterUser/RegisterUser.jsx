import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "../../Context";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import "./user.css";
import Listuser from "./listuser/Listuser";

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
        Irfan Library Management ❤️
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const RegisterUser = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [profile, setProfile] = useState([]);
  const [page, setPage] = useState(false);
  const [details, setdetails] = useState(false);

  //   useEffect(() => {
  //     const getuser = async () => {
  //       try {
  //         let response = await axios({
  //           url: `${state.baseUrl}/profile`,
  //           method: "get",
  //           withCredentials: true,
  //         });

  //         if (response.status === 200) {
  //           setProfile(response?.data);
  //         } else {
  //           console.log("error in api call");
  //         }
  //       } catch (e) {
  //         console.log("Error in api", e);
  //       }
  //     };
  //     getuser();
  //   }, []);

  return (
    <div>
      {state?.user === null ? (
        <div> Loading... </div>
      ) : (
        <div className="categoryMain">
          <div className="profileDiv">
            <div className="userHead">
              <h2>User Management</h2>
            </div>

            <div className="setting-haed">
              <h5>
                <a href="#"> Dashboard</a> <span>/ User Management</span>
              </h5>
            </div>

            <div className="from-man">
              <div className="main-category">
                <div className="edit-setting-hadding">
                  <h5>
                    {" "}
                    <CalendarViewMonthIcon />
                    <span className="user"> User Management</span>
                  </h5>
                </div>
              </div>
            </div>

            {/* /////////////////// */}

            <div className="seletInput">
              <div>
                <select id="select" name="select" type="select">
                  <option>10</option>
                  <option>9</option>
                  <option>8 </option>
                  <option>7</option>
                  <option>6</option>
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </select>
                <span> Entaries Per Page</span>
              </div>
              <div>
                <input
                  className="settingField"
                  type="email"
                  placeholder="Search..."
                />
              </div>
            </div>

            <div className="maincategory">
              <div className="list-name">
                <h6>
                  <b>User Name</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Email Address</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Password</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Contact No.</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Address</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Email Verified</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Status</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Created On</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Updated On</b>
                </h6>
              </div>
              <div className="list-name">
                <h6>
                  <b>Action</b>
                </h6>
              </div>
            </div>
          </div>
          <Listuser />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
