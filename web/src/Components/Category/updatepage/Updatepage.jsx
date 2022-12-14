import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { GlobalContext } from "../../../Context";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Updatepage = ({ details }) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [category, setcategory] = useState([]);
  const [uid, setuid] = useState(state.user.data._id);
  const [cid, setcid] = useState(details._id);

  const formik = useFormik({
    initialValues: {
      categoryName: details.categoryName,
      // categoryid,
    },
    validationSchema: yup.object({
      categoryName: yup
        .string("Enter your categoryName")
        .required("categoryName is required"),
    }),

    onSubmit: async (value) => {
      console.log("🚀 ~ details", details);
      try {
        const update = await axios.put(
          `${state.baseUrl}/category/${details._id}`,
          {
            categoryName: value?.categoryName,
            // _id: details?._id,
          }
        );
        console.log("🚀 ~ cid", cid);

        toast.success("Updated category", {
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
          Edit Category Details
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
            value={formik.values.categoryName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.categoryName && formik.errors.categoryName ? (
          <div className="errorMessage">{formik.errors.categoryName}</div>
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

export default Updatepage;
