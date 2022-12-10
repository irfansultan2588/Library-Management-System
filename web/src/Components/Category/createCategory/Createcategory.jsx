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

    // enableReinitialize: true,
    onSubmit: async (values) => {
      // if (seetings === null) {
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
          navigate("/dashboard/category");
          setToggleRefresh(!toggleRefresh);
        })
        .catch((err) => {
          toast.error("Create Category Error", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log("ERROR", err);
        });
      // } else {
      // try {
      //   const update = await axios.put(
      //     `${state.baseUrl}/settings/${seetings?._id}`,
      //     {
      //       libraryName: values?.libraryName,
      //       address: values?.address,
      //       contactNo: values?.contactNo,
      //       emailaddress: values?.emailaddress,
      //       bookReturnDayLimit: values?.bookReturnDayLimit,
      //       bookLateReturnOneDayFine: values?.bookLateReturnOneDayFine,
      //       perUserBookIssueLimit: values?.perUserBookIssueLimit,
      //       currency: values?.currency,
      //       timezone: values?.timezone,
      //     }
      //   );
      //   toast.success("Updated Librarry", {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      // } catch (e) {
      //   toast.error("Updated Error", {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      //   console.log("Error in api call: ", e);
      //   setToggleRefresh(!toggleRefresh);
      // }
      // }
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createcategory;
