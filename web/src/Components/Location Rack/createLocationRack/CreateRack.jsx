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

const CreateRack = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      locationRackName: "",
    },
    validationSchema: yup.object({
      locationRackName: yup
        .string("Enter your locationRackName")
        .required("locationRackName is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      axios({
        method: "post",
        url: `${state.baseUrl}/locationRack`,
        data: {
          locationRackName: values?.locationRackName,
          uid,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          toast.success("Create Location Rack", {
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
          Add New Location Rack
        </h6>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="settingInput">
          <h5>Location Rack Name</h5>
          <input
            className="settingField"
            type="text"
            name="locationRackName"
            placeholder="Enter Location Rack Name"
            value={formik.values.locationRackName}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.locationRackName && formik.errors.locationRackName ? (
          <div className="errorMessage">{formik.errors.locationRackName}</div>
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

export default CreateRack;
