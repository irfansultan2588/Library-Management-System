import React from "react";
import axios from "axios";
import { useContext } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { GlobalContext } from "../../../Context";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const UpdateBook = ({ details }) => {
  let { state, dispatch } = useContext(GlobalContext);

  const formik = useFormik({
    initialValues: {
      bookName: details.bookName,
    },
    validationSchema: yup.object({
      bookName: yup
        .string("Enter your bookName")
        .required("bookName is required"),
    }),

    onSubmit: async (value) => {
      try {
        const update = await axios.put(`${state.baseUrl}/book/${details._id}`, {
          bookName: value?.bookName,
        });

        toast.success("Updated Book", {
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
          Edit Book Details
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
            value={formik.values.bookName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.bookName && formik.errors.bookName ? (
          <div className="errorMessage">{formik.errors.bookName}</div>
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

export default UpdateBook;
