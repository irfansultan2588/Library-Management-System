import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { GlobalContext } from "../../../Context";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const UpdateAuthor = ({ details }) => {
  let { state, dispatch } = useContext(GlobalContext);

  const formik = useFormik({
    initialValues: {
      authorName: details.authorName,
    },
    validationSchema: yup.object({
      authorName: yup
        .string("Enter your authorName")
        .required("authorName is required"),
    }),

    onSubmit: async (value) => {
      try {
        const update = await axios.put(
          `${state.baseUrl}/author/${details._id}`,
          {
            authorName: value?.authorName,
          }
        );

        toast.success("Updated Author", {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (e) {
        toast.error("Updated Error", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
  });
  return (
    <div className="main-add">
      <div className="main-addww">
        <h6>
          <PersonAddAltIcon />
          Edit Author Details
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
            value={formik.values.authorName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.authorName && formik.errors.authorName ? (
          <div className="errorMessage">{formik.errors.authorName}</div>
        ) : null}

        <div className="btn-Edit">
          <button type="submit" className="btn-2">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAuthor;
