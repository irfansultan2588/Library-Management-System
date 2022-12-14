import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../Context";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Userpage from "../userpage/Userpage";
import axios from "axios";
import Container from "react-bootstrap/Container";

const columns = [
  { id: "bookisbn", label: "Book ISBN NO.", minWidth: 100 },
  { id: "bookName", label: "Book Name", minWidth: 100 },
  {
    id: "issueDate",
    label: "Issue Date",
    minWidth: 100,
  },
  {
    id: "returnDate",
    label: "Return Date",
    minWidth: 100,
  },
  {
    id: "fines",
    label: "Fines",
    minWidth: 100,
  },
  {
    id: "Status",
    label: "Status",
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

const Userissue = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [issueBook, SetIssueBook] = useState([]);
  const [pages, setPages] = useState(false);

  useEffect(() => {
    const getIssueBook = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/issuebook/${state?.user?._id}`,
          method: "get",
          withCredentials: true,
        });

        if (response.status === 200) {
          SetIssueBook(response?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getIssueBook();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Container>
        <Userpage />
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
                    {issueBook?.map((row) => (
                      <TableRow key={row?.number}>
                        <TableCell key={row?.book?.bookIsbnNumber}>
                          {row?.bookIsbnNumber}
                        </TableCell>
                        <TableCell key={row?.book?.bookName}>
                          {row?.bookName}
                        </TableCell>
                        <TableCell key={row?.issueDate}>
                          {row?.issueDate}
                        </TableCell>
                        <TableCell key={row?.returnDate}>
                          {row?.returnDate}
                        </TableCell>
                        <TableCell>{row?.verify ? "Rs.0" : "Rs.0"}</TableCell>
                        <TableCell>
                          {row.status ? (
                            <button className="btn-Issue">Issue</button>
                          ) : (
                            <button className="btn-View">Return</button>
                          )}
                        </TableCell>
                        <TableCell key={row?.createdOn}>
                          {row?.createdOn}
                        </TableCell>
                        <TableCell key={row?.updatedAt}>
                          {row?.updatedAt}
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
                count={issueBook.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={false}
              />
            </Paper>
          </div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      </Container>
    </>
  );
};

export default Userissue;
