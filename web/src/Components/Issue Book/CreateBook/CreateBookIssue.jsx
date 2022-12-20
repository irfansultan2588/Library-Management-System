import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFormik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "../../../Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Createissuebook.css";

const CreateBookIssue = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);

  const formik = useFormik({
    initialValues: {
      bookIsbnNumber: "",
      uniqueID: "",
    },
    validationSchema: yup.object({
      bookIsbnNumber: yup
        .number("Enter your bookIsbnNumber")
        .required("bookIsbnNumber is required"),
      uniqueID: yup
        .string("Enter your uniqueID")
        .required("uniqueID is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      axios({
        method: "post",
        url: `${state.baseUrl}/issuebook `,
        data: {
          bookIsbnNumber: values?.bookIsbnNumber,
          uniqueID: values?.uniqueID,
          uid,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          toast.success("Issue book", {
            position: toast.POSITION.TOP_CENTER,
          });
          resetForm();
          //   navigate("/dashboard/Author");
          setToggleRefresh(!toggleRefresh);
        })
        .catch((err) => {
          toast.error("Creating Error", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log("ERROR", err);
        });
    },
  });
  return (
    <div className="main-Issue">
      <div className="main-addww">
        <h6>
          <PersonAddAltIcon />
          Issue New bookName
        </h6>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="Issue-book">
          <div className="bookInput">
            <h5>Book ISBN Number</h5>
            <input
              className="bookField"
              type="number"
              name="bookIsbnNumber"
              placeholder="Enter Book ISBN Number"
              value={formik.values.bookIsbnNumber}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.bookIsbnNumber && formik.errors.bookIsbnNumber ? (
            <div className="errorMessage">{formik.errors.bookIsbnNumber}</div>
          ) : null}
        </div>

        <div className="Issue-book">
          <div className="bookInput">
            <h5>User Unique ID</h5>
            <input
              className="bookField"
              type="text"
              name="uniqueID"
              placeholder="Enter User Unique ID Number"
              value={formik.values.uniqueID}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.uniqueID && formik.errors.uniqueID ? (
            <div className="errorMessage">{formik.errors.uniqueID}</div>
          ) : null}
        </div>

        <div className="btn-Edit">
          <button type="submit" className="btn-2">
            Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookIssue;
