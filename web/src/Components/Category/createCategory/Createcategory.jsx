import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./created.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "../../../Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createcategory = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const [category, setcategory] = useState([]);
  const [page, setPage] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: yup.object({
      categoryName: yup
        .string("Enter your categoryName")
        .required("categoryName is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      axios({
        method: "post",
        url: `${state.baseUrl}/category`,
        data: {
          categoryName: values?.categoryName,
          uid,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          toast.success("Create Category", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate(-0);
          resetForm();
          setToggleRefresh(!toggleRefresh);
        })
        .catch((err) => {
          toast.error("Create Category Error", {
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
          Add New Category
        </h6>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="settingInput">
          <h5>Category Name</h5>
          <input
            className="settingField"
            type="text"
            name="categoryName"
            placeholder="Enter Category Name"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.categoryName && formik.errors.categoryName ? (
          <div className="errorMessage">{formik.errors.categoryName}</div>
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

export default Createcategory;
