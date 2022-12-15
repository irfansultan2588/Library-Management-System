import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFormik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "../../../Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      bookName: "",
      selectAuthor: "",
      selectCategory: "",
      selectAuthor: "",
      selectLocationRack: "",
      bookIsbnNumber: "",
      NoOfCopy: "",
    },
    validationSchema: yup.object({
      bookName: yup
        .string("Enter your bookName")
        .required("bookName is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      axios({
        method: "post",
        url: `${state.baseUrl}/bookName`,
        data: {
          bookName: values?.bookName,
          uid,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          toast.success("Create bookName", {
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
    <div className="main-add">
      <div className="main-addww">
        <h6>
          <PersonAddAltIcon />
          Add New bookName
        </h6>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="settingInput">
          <h5>Book Name</h5>
          <input
            className="settingField"
            type="text"
            name="bookName"
            placeholder="Enter Book Name"
            value={formik.values.bookName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.bookName && formik.errors.bookName ? (
          <div className="errorMessage">{formik.errors.bookName}</div>
        ) : null}
        <div className="settingInput">
          <h5>Select Author</h5>
          <input
            className="settingField"
            type="text"
            name="bookName"
            placeholder="Enter Book Name"
            value={formik.values.bookName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.bookName && formik.errors.bookName ? (
          <div className="errorMessage">{formik.errors.bookName}</div>
        ) : null}

        <div className="btn-Edit">
          <button type="submit" className="btn-2">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
