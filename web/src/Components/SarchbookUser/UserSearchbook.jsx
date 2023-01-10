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
import "./searchbook.css";

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

const columns = [
  { id: "bookName", label: "Book Name", minWidth: 100 },
  {
    id: "bookIsbnNumber",
    label: "ISBN No.",
    minWidth: 100,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
  },
  {
    id: "author",
    label: "Author",
    minWidth: 100,
  },
  {
    id: "locationRack",
    label: "Location Rack",
    minWidth: 100,
  },
  {
    id: "bookCopy",
    label: "No Of Available Copy",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
  {
    id: "createdOn",
    label: "Added On",
    minWidth: 100,
  },
];

const UserSearchbook = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [Books, Setbooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/books`,
          method: "get",
          withCredentials: true,
        });

        if (response.status === 200) {
          Setbooks(response?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getBooks();
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
      <Userpage />
      <Container>
        <div className="categoryMain">
          <div className="profileDiv">
            <div className="userHead">
              <h2>Search Book</h2>
            </div>
            <Paper sx={{ width: "100%", overflow: "hidden" }} id="footer3">
              <div className="setting-haed">
                <h5>Book List</h5>
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
                    {Books?.map((row) => (
                      <TableRow key={row?.number}>
                        <TableCell key={row?.bookName}>
                          {row?.bookName}
                        </TableCell>
                        <TableCell key={row?.book?.bookIsbnNumber}>
                          {row?.bookIsbnNumber}
                        </TableCell>
                        <TableCell key={row?.category}>
                          {row?.category?.categoryName}
                        </TableCell>
                        <TableCell key={row?.author}>
                          {row?.author?.authorName}
                        </TableCell>
                        <TableCell key={row?.locationRack}>
                          {row?.locationRack?.locationRackName}
                        </TableCell>
                        <TableCell key={row?.bookCopy}>
                          {row?.bookCopy}
                        </TableCell>
                        <TableCell>
                          {row.status ? (
                            <button className="btn-Available">Available</button>
                          ) : (
                            <button className="btn-notAvailable">
                              Not Available
                            </button>
                          )}
                        </TableCell>
                        <TableCell key={row?.createdOn}>
                          {row?.createdOn}
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
                count={Books.length}
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

export default UserSearchbook;
