import React from "react";
import axios from "axios";
import { useContext } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { GlobalContext } from "../../../Context";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const ViewIssue = ({ details }) => {
  let { state, dispatch } = useContext(GlobalContext);
  //   const formik = useFormik({
  //     initialValues: {
  //       locationRackName: details.locationRackName,
  //     },
  //     validationSchema: yup.object({
  //       locationRackName: yup
  //         .string("Enter your locationRackName")
  //         .required("locationRackName is required"),
  //     }),

  //     onSubmit: async (value) => {
  //       try {
  //         const update = await axios.put(
  //           `${state.baseUrl}/locationRack/${details._id}`,
  //           {
  //             locationRackName: value?.locationRackName,
  //           }
  //         );

  //         toast.success("Updated Author", {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } catch (e) {
  //         toast.error("Updated Error", {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       }
  //     },
  //   });
  return (
    <>SFCADFC</>
    // <div className="main-add">
    //   <div className="main-addww">
    //     <h6>
    //       <PersonAddAltIcon />
    //       Edit Location Rack Details
    //     </h6>
    //   </div>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       formik.handleSubmit();
    //     }}
    //   >
    //     <div className="settingInput">
    //       <h5>Location Rack Name</h5>
    //       <input
    //         className="settingField"
    //         type="text"
    //         name="locationRackName"
    //         value={formik.values.locationRackName}
    //         onChange={formik.handleChange}
    //       />
    //     </div>
    //     {formik.touched.locationRackName && formik.errors.locationRackName ? (
    //       <div className="errorMessage">{formik.errors.locationRackName}</div>
    //     ) : null}

    //     <div className="btn-Edit">
    //       <button type="submit" className="btn-2">
    //         Edit
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default ViewIssue;
