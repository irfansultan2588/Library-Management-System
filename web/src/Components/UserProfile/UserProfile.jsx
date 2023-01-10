import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { GlobalContext } from "../../Context";
import { useContext, useState } from "react";
import "./userProfile.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Userpage from "../userpage/Userpage";

const theme = createTheme();

const UserProfile = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      address: "",
      contactNo: "",
    },

    // validationSchema: yup.object({
    //   fullName: yup
    //     .string("Enter your fullName")
    //     .required("fullName is required"),
    //   email: yup
    //     .string("Enter your email")
    //     .email("Enter a valid email")
    //     .required("Email is required"),
    //   password: yup
    //     .string("Enter your password")
    //     .min(4, "Password should be of minimum 4 characters length")
    //     .required("Password is required"),
    //   address: yup
    //     .string("Enter your address")

    //     .required("address is required"),
    //   contactNo: yup
    //     .string("Enter your number")

    //     .required("number is required"),
    // }),

    onSubmit: async (values) => {
      axios({
        method: "post",
        url: `${state.baseUrl}/signup`,

        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          address: values.address,
          contactNo: values.contactNo,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          alert("upload Success");
          setToggleRefresh(!toggleRefresh);
          //   navigate("/Otp", { state: { email: values.email } });
        })
        .catch((err) => {
          alert("upload Error");
          console.log("ERROR", err);
        });
    },
  });
  return (
    <div>
      <Userpage />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="boder">
          <div className="main2">
            <h4 className="hading-Profile">Profile</h4>
          </div>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
            }}
          >
            <Box sx={{ mt: 3 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="errorMessage">{formik.errors.email}</div>
                  ) : null}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="errorMessage">{formik.errors.password}</div>
                  ) : null}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="fullName"
                      name="fullName"
                      label="User Name"
                      type="text"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="errorMessage">{formik.errors.fullName}</div>
                  ) : null}

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="contactNo"
                      name="contactNo"
                      label="User Contact No"
                      type="number"
                      value={formik.values.contactNo}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.contactNo && formik.errors.contactNo ? (
                      <div className="errorMessage">
                        {formik.errors.contactNo}
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="User Address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  {formik.touched.address && formik.errors.address ? (
                    <div className="errorMessage">{formik.errors.address}</div>
                  ) : null}
                </Grid>
                <Link className="line">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                </Link>
              </form>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default UserProfile;
