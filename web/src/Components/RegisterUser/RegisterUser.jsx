import { useContext } from "react";
import { useState, useEffect } from "react";
import { GlobalContext } from "../../Context";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import "./user.css";
import Listuser from "./listuser/Listuser";
import axios from "axios";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TabScrollButton } from "@mui/material";

const columns = [
  { id: "_id", label: "User Unique ID", minWidth: 100 },
  { id: "fullName", label: "userName", minWidth: 100 },
  {
    id: "email",
    label: "Email Address",
    minWidth: 100,
  },
  {
    id: "contactNo",
    label: "Contact No",
    minWidth: 100,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 100,
  },
  {
    id: "verify",
    label: "Email Verified",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  {
    id: "createdOn",
    label: "createdOn",
    minWidth: 100,
  },
  {
    id: "updatedAt",
    label: "updatedAt",
    minWidth: 100,
  },

  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

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
  // const [page, setPage] = useState(false);
  const [details, setdetails] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [user, setuser] = useState([]);

  useEffect(() => {
    const getusers = async () => {
      try {
        let values = await axios({
          url: `${state.baseUrl}/userdata${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });
        if (values.status === 200) {
          setuser(values?.data);
        } else {
          console.log("Error in api");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getusers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {!page && (
              <div className="from-man">
                <div className="main-category">
                  <div className="edit-setting-hadding">
                    <h5>
                      {" "}
                      <CalendarViewMonthIcon />
                      <span className="user"> User Management</span>
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
            {/* /////////////////// */}
            <Paper sx={{ width: "100%", overflow: "hidden" }} id="footer223">
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* ////////////////////// */}

                    {/* <div className="maincategory">
                      {user?.map((item) => {
                        console.log("🚀 ~ item", item);
                        return (
                          <>
                            <div className="list-name">
                              <p>{state.user.data._id}</p>
                            </div>
                            <div className="list-name">
                              <p>{item?.fullName}</p>
                            </div>
                            <div className="list-name">
                              <p>{item?.email}</p>
                            </div>
                            <div className="list-name">
                              <p>Password</p>
                            </div>
                            <div className="list-name">
                              <p>{state.user.data.address}</p>
                            </div>
                            <div className="list-name">
                              <p>{state.user.data.contactNo}</p>
                            </div>
                            <div className="list-name">
                              <p>Yes</p>
                            </div>
                            <div className="list-name">
                              <p>
                                <>
                                  {state.user.data.status ? (
                                    <button className="btn-enable">
                                      Enable
                                    </button>
                                  ) : (
                                    <button className="btn-disable">
                                      Disable
                                    </button>
                                  )}
                                </>
                              </p>
                            </div>
                            <div className="list-name">
                              <p>{state.user.data.createdOn}</p>
                            </div>
                            <div className="list-name">
                              <p>{state.user.data.updatedAt}</p>
                            </div>
                            <div className="list-name">
                              <button
                                className="btn-delete"
                                //  onClick={() => Handlerstatus(state)}
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        );
                      })}
                    </div> */}

                    {/* /////////////////////////////// */}
                    {user
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  sx={Boolean}
                                >
                                  {typeof value === "boolean"
                                    ? value
                                      ? "Yes"
                                      : "No"
                                    : column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                id="footer"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={user.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={false}
              />
            </Paper>
            {/* ////////////////////////////////////// */}
          </div>
          <Listuser />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
