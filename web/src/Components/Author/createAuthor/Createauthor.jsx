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

const Createauthor = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      authorName: "",
    },
    validationSchema: yup.object({
      authorName: yup
        .string("Enter your authorName")
        .required("authorName is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      axios({
        method: "post",
        url: `${state.baseUrl}/author`,
        data: {
          authorName: values?.authorName,
          uid,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          toast.success("Create Author", {
            position: toast.POSITION.TOP_CENTER,
          });
          resetForm();
          navigate(-0);
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
          Add New Author
        </h6>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="settingInput">
          <h5>Author Name</h5>
          <input
            className="settingField"
            type="text"
            name="authorName"
            placeholder="Enter Author Name"
            value={formik.values.authorName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.authorName && formik.errors.authorName ? (
          <div className="errorMessage">{formik.errors.authorName}</div>
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

export default Createauthor;
