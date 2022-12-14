import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { GlobalContext } from "../../Context";
import LibraryManagement from "../LibrarryManagement/LibraryManagement";
import { useFormik } from "formik";
import * as yup from "yup";
import "./login.css";
import { toast } from "react-toastify";

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

const theme = createTheme();

function Login() {
  let { state, dispatch } = useContext(GlobalContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string("Enter your email").required("Email is required"),
      password: yup
        .string("Enter your password")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${state.baseUrl}/login`,

          {
            email: values.email,
            password: values.password,
          },

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            withCredentials: true, // should be there
            credentials: "include", // should be there
          }
        );
        toast.success("Login Success", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({ type: "USER_LOGIN", payload: values });
      } catch (e) {
        toast.error("Login Faild", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Error in api", e);
      }
    },
  });

  return (
    <>
      <LibraryManagement />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="boder">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
            }}
          >
            <div className="main">
              <h4 className="hading-signup">User Login</h4>
            </div>
            <Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="errorMessage">{formik.errors.email}</div>
                ) : null}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="errorMessage">{formik.errors.password}</div>
                ) : null}

                <Button
                  className="btn-signup"
                  type="submit"
                  disabled={!formik.isValid}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  LogIn
                </Button>
              </form>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login;
