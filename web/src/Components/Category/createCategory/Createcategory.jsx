import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./created.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "../../../Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Createcategory = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const navigate = useNavigate();
  const [edit, setedit] = useState(false);
  const [category, setcategory] = useState({});

  useEffect(() => {
    const getcategory = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/categorys/${state?.user?._id}`,
          method: "get",
          withCredentials: true,
        });
        if (response.status === 200) {
          setcategory(response?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getcategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      categoryName: category?.categoryName ? category?.categoryName : "",
    },
    validationSchema: yup.object({
      categoryName: yup
        .string("Enter your categoryName")
        .required("categoryName is required"),
    }),

    enableReinitialize: true,
    onSubmit: async (values) => {
      if (category === null) {
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
      } else {
        try {
          const update = await axios.put(
            `${state.baseUrl}/category/${category?._id}`,
            {
              categoryName: values?.categoryName,
            }
          );
          toast.success("Updated category", {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (e) {
          toast.error("Updated Error", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log("Error in api call: ", e);
          setToggleRefresh(!toggleRefresh);
        }
      }
    },
  });

  return (
    <div className="main-add">
      <div className="main-addww">
        {category === null ? (
          <h6>
            <PersonAddAltIcon />
            Add New Category
          </h6>
        ) : (
          <h6>
            <PersonAddAltIcon />
            Edit Category Details
          </h6>
        )}
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
            {category === null ? "Add" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createcategory;
