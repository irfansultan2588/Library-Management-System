import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "../../Context";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import "./user.css";
import Listuser from "./listuser/Listuser";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "User Unique ID", label: "User Unique ID", minWidth: 100 },
  { id: "userName", label: "userName", minWidth: 100 },
  {
    id: "email",
    label: "Email Address",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Password",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Contact NO.",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Address",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Email Verified",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "createdOn",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "updatedAt",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Action",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
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
  const [profile, setProfile] = useState([]);
  // const [page, setPage] = useState(false);
  const [details, setdetails] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                    {rows
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
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            {/* ////////////////////////////////////// */}
            {/* <div className="seletInput">
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
            </div> */}

            {/* <div className="maincategory">
              <div className="list-name">
                <h6>
                  <b>User Unique ID</b>
                </h6>
              </div>
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
            </div> */}
          </div>
          <Listuser />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
