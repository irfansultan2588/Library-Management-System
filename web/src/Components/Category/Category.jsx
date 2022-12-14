import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { GlobalContext } from "../../Context";
import CategoryIcon from "@mui/icons-material/Category";
import "./categoread.css";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Createcategory from "./createCategory/Createcategory";
import Listcategory from "./ListCategory/Listcategory";
import Updatepage from "./updatepage/Updatepage";

// import { NavLink } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";
// import Addcategory from "../AddCategory/Addcategory";

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

const Category = () => {
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
              <h2> Category Management</h2>
            </div>

            <div className="setting-haed">
              <h5>
                <a href="#"> Dashboard</a> <span>/ Categoty Management</span>
              </h5>
            </div>
            {!page && (
              <div className="from-man">
                <div className="main-category">
                  <div className="edit-setting-hadding">
                    <h5>
                      {" "}
                      <CategoryIcon /> Category Management
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
              <Createcategory />
            ) : details ? (
              <Updatepage details={details} />
            ) : (
              <Listcategory setdetails={setdetails} />
            )}
          </div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      )}
    </div>
  );
};

export default Category;
