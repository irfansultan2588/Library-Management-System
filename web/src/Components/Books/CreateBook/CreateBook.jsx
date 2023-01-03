import React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFormik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "../../../Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./createbook.css";

const CreateBook = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const [categoryData, setcategoryData] = useState([]);
  const [authorData, setauthorData] = useState([]);
  const [rackData, setrackData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      try {
        let responseCategory = await axios({
          url: `${state.baseUrl}/categorys/${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });

        if (responseCategory.status === 200) {
          setcategoryData(responseCategory?.data);
        } else {
          console.log("error in api call");
        }
        let responseAuthor = await axios({
          url: `${state.baseUrl}/authors/${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });

        if (responseAuthor.status === 200) {
          setauthorData(responseAuthor?.data);
        } else {
          console.log("error in api call");
        }
        let responseRack = await axios({
          url: `${state.baseUrl}/locationRacks/${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });

        if (responseRack.status === 200) {
          setrackData(responseRack?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getdata();
  }, []);

  const formik = useFormik({
    initialValues: {
      bookName: "",
      author: {
        authorName: "",
        _id: "",
      },
      category: {
        categoryName: "",
        _id: "",
      },
      locationRack: {
        locationRackName: "",
        _id: "",
      },
      bookIsbnNumber: "",
      bookCopy: "",
    },
    validationSchema: yup.object({
      bookName: yup
        .string("Enter your bookName")
        .required("bookName is required"),
      bookIsbnNumber: yup
        .number("Enter your bookIsbnNumber")
        .required("bookIsbnNumber is required"),
      bookCopy: yup
        .number("Enter your bookCopy")
        .required("bookCopy is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      axios({
        method: "post",
        url: `${state.baseUrl}/createbook `,
        data: {
          bookName: values?.bookName,
          author: JSON.parse(values?.author),
          category: JSON.parse(values?.category),
          locationRack: JSON.parse(values?.locationRack),
          bookIsbnNumber: values?.bookIsbnNumber,
          bookCopy: values?.bookCopy,
          uid,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          toast.success("Create book", {
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
    <div className="main-book">
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
        <div className="main-book-from">
          <div className="bookInput">
            <h5>Book Name</h5>
            <input
              className="bookField"
              type="text"
              name="bookName"
              placeholder="Enter Book Title"
              value={formik.values.bookName}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.bookName && formik.errors.bookName ? (
            <div className="errorMessage">{formik.errors.bookName}</div>
          ) : null}
          <div className="bookInput">
            <h5>Select Author</h5>
            <select
              name="author"
              className="bookField"
              onChange={formik.handleChange}
            >
              <option defaultValue={true} value={formik.values.author}>
                Select Author
              </option>
              {authorData.map((val) => {
                return (
                  <>
                    {" "}
                    <option
                      key={val._id}
                      value={`{ "_id": "${val._id}", "authorName":"${val.authorName}"}`}
                    >
                      {val.authorName}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
        <div className="main-book-from">
          <div className="bookInput">
            <h5>Select Category</h5>
            <select
              className="bookField"
              name="category"
              onChange={formik.handleChange}
            >
              <option defaultValue={true} value={formik.values.category}>
                Select Category
              </option>
              {categoryData.map((val) => {
                return (
                  <option
                    key={val._id}
                    value={`{ "_id": "${val._id}", "categoryName":"${val.categoryName}"}`}
                  >
                    {val.categoryName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="bookInput">
            <h5>Select Location Rack</h5>
            <select
              className="bookField"
              name="locationRack"
              onChange={formik.handleChange}
            >
              <option defaultValue={true} value={formik.values.locationRack}>
                Select Location Rack
              </option>
              {rackData.map((val) => {
                return (
                  <option
                    value={`{ "_id": "${val._id}", "locationRackName":"${val.locationRackName}"}`}
                  >
                    {val.locationRackName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="main-book-from">
          <div className="bookInput">
            <h5>Book ISBN Number</h5>
            <input
              className="bookField"
              type="number"
              name="bookIsbnNumber"
              placeholder="Enter Book ISBN Number"
              value={formik.values.bookIsbnNumber}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.bookIsbnNumber && formik.errors.bookIsbnNumber ? (
            <div className="errorMessage">{formik.errors.bookIsbnNumber}</div>
          ) : null}
          <div className="bookInput">
            <h5>No. Of Copy</h5>
            <input
              className="bookField"
              type="number"
              name="bookCopy"
              placeholder="No.Of Copy"
              value={formik.values.bookCopy}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.bookCopy && formik.errors.bookCopy ? (
            <div className="errorMessage">{formik.errors.bookCopy}</div>
          ) : null}
        </div>
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
