import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { GlobalContext } from "../../../Context";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const UpdateBook = ({ details }) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [categoryData, setcategoryData] = useState([]);
  const [authorData, setauthorData] = useState([]);
  const [rackData, setrackData] = useState([]);

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
      bookName: details.bookName,

      author: {
        authorName: details.authorName,
      },
      category: {
        categoryName: details.categoryName,
      },
      locationRack: {
        locationRackName: details.locationRackName,
      },
      bookIsbnNumber: details.bookIsbnNumber,
      bookCopy: details.bookCopy,
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

    onSubmit: async (values) => {
      try {
        const update = await axios.put(`${state.baseUrl}/book/${details._id}`, {
          bookName: values?.bookName,
          authorName: JSON.parse(values?.authorName),
          category: JSON.parse(values?.category),
          locationRack: JSON.parse(values?.locationRack),
          bookIsbnNumber: values?.bookIsbnNumber,
          bookCopy: values?.bookCopy,
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
    <div className="main-book">
      <div className="main-addww">
        <h6>
          <PersonAddAltIcon />
          Edit bookName
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
                {details.author.authorName}
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
          {formik.touched.author && formik.errors.author ? (
            <div className="errorMessage">{formik.errors.author}</div>
          ) : null}
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
                {details.category.categoryName}
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
            {formik.touched.category && formik.errors.category ? (
              <div className="errorMessage">{formik.errors.category}</div>
            ) : null}
          </div>

          <div className="bookInput">
            <h5>Select Location Rack</h5>
            <select
              className="bookField"
              name="locationRack"
              onChange={formik.handleChange}
            >
              <option value={formik.values.locationRack}>
                {details.locationRack.locationRackName}
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
          {formik.touched.locationRack && formik.errors.locationRack ? (
            <div className="errorMessage">{formik.errors.locationRack}</div>
          ) : null}
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
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
