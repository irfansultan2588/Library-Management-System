import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

import "./user.css";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../Context";
import { useContext } from "react";
import Userissue from "../Issueuserpage/Userissue";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import axios from "axios";

const columns = [
  { id: "bookisbn", label: "Book ISBN NO.", minWidth: 100 },
  { id: "fullName", label: "Book Name", minWidth: 100 },
  {
    id: "email",
    label: "Issue Date",
    minWidth: 100,
  },
  {
    id: "contactNo",
    label: "Return Date",
    minWidth: 100,
  },
  {
    id: "address",
    label: "Fines",
    minWidth: 100,
  },
  {
    id: "Status",
    label: "Email Verified",
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

const Userpage = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [user, setuser] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [issueBook, setIssueBook] = useState([]);

  useEffect(() => {
    const getIssueBook = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/issuebook/${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });

        if (response.status === 200) {
          setIssueBook(response?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getIssueBook();
  }, []);

  let param = useParams();
  const navigate = useNavigate();

  const _rend = () => {
    switch (param?.type) {
      case "issueuser":
        return <Userissue />;
      // default:
      //   return "Page Not Found";
    }
  };

  const navigetTo = (location) => {
    navigate(location);
  };

  const Handlerstatus = async (row) => {
    try {
      const update = await axios.put(
        `${state.baseUrl}/userstatus/${state?.user?.data?._id}`,
        {
          status: !row?.status,
        }
      );

      if (update.status === 200) {
        const updated = user.map((user) =>
          user?._id === row?._id ? { ...user, status: !row?.status } : user
        );
        setuser(updated);
      } else {
        console.log("error in api call");
      }
    } catch (e) {
      console.log("🚀 ~ e", e);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Container>
        <Row className="line">
          <Col>
            <div>
              <h3 className="hadding">Library Management System</h3>
            </div>
          </Col>
          <Col>
            <div className="main-col">
              <a href="">Issue Book</a>
              <a href="">Search Book</a>
              <a href="">Profile</a>
              <a href="">Logout</a>{" "}
            </div>
          </Col>
        </Row>
        <div className="categoryMain">
          <div className="profileDiv">
            <div className="userHead">
              <h2>Issue Book Details</h2>
            </div>

            <Paper sx={{ width: "100%", overflow: "hidden" }} id="footer3">
              <div className="setting-haed">
                <h5>Author Managment</h5>
              </div>
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
                    {user?.map((row) => (
                      <TableRow key={row?.number}>
                        <TableCell key={row?._id}>{row?._id}</TableCell>
                        <TableCell key={row?.fullName}>
                          {row?.fullName}
                        </TableCell>
                        <TableCell key={row?.email}>{row?.email}</TableCell>
                        <TableCell key={row?.contactNo}>
                          {row?.contactNo}
                        </TableCell>
                        <TableCell key={row?.address}>{row?.address}</TableCell>
                        <TableCell>{row?.verify ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {row.status ? (
                            <button className="btn-enable">Enable</button>
                          ) : (
                            <button className="btn-disable">Disable</button>
                          )}
                          {/* {state?.user?.data?.status ? (
                          ) : (
                            <button className="btn-disable">Disable</button>
                          )} */}
                        </TableCell>
                        <TableCell key={row?.createdOn}>
                          {row?.createdOn}
                        </TableCell>
                        <TableCell key={row?.updatedAt}>
                          {row?.updatedAt}
                        </TableCell>
                        <TableCell>
                          <button
                            className="btn-delete"
                            onClick={() => Handlerstatus(row)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
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
          </div>
        </div>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      {_rend()}
    </div>
  );
};

export default Userpage;
