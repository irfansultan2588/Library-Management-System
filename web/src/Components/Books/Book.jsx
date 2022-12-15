import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "../../Context";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CreateBook from "./CreateBook/CreateBook";
import ListBook from "./ListBook/ListBook";
import UpdateBook from "./Update Book/UpdateBook";
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

const Book = () => {
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
              <h2>Book Management</h2>
            </div>

            <div className="setting-haed">
              <h5>
                <a href="#"> Dashboard</a> <span>/ Book Management</span>
              </h5>
            </div>
            {!page && (
              <div className="from-man">
                <div className="main-category">
                  <div className="edit-setting-hadding">
                    <h5>
                      {" "}
                      <CalendarViewMonthIcon />
                      Book Management
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
              <CreateBook />
            ) : details ? (
              <UpdateBook details={details} />
            ) : (
              <ListBook setdetails={setdetails} />
            )}
          </div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      )}
    </div>
  );
};

export default Book;
