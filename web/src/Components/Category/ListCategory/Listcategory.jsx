import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GlobalContext } from "../../../Context";
import { useState } from "react";
import axios from "axios";
import "./listcategory.css";

const Listcategory = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);

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
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
        .then((res) => {
          toast.success("Create Category", {
            position: toast.POSITION.TOP_CENTER,
          });
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="seletInput">
          <div>
            <select
              id="select"
              name="select"
              type="select"
              value={formik.values.select}
              onChange={formik.handleChange}
            >
              <option>10</option>
              <option>9</option>
              <option>8 </option>
              <option>7</option>
              <option>6</option>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
            <span> Entaries Per Page</span>
          </div>
          <div>
            <input
              className="settingField"
              type="email"
              placeholder="Search..."
            />
          </div>
        </div>
        {formik.touched.select && formik.errors.select ? (
          <div className="errorMessage">{formik.errors.select}</div>
        ) : null}

        <div className="maincategory">
          <div className="list-name">
            <h6>Category Name</h6>
          </div>
          <div className="list-name">
            <h6>Status</h6>
          </div>
          <div className="list-name">
            <h6>Created On</h6>
          </div>
          <div className="list-name">
            <h6>Updated On</h6>
          </div>
          <div className="list-name">
            <h6>Action</h6>
          </div>
        </div>
        <div className="maincategory">
          <div className="list-name">
            <h6>Category Name</h6>
          </div>
          <div className="list-name">
            <h6>Category Name</h6>
          </div>
          <div className="list-name">
            <h6>Category Name</h6>
          </div>
          <div className="list-name">
            <h6>Category Name</h6>
          </div>
          <div className="list-name">
            <h6>Category Name</h6>
          </div>
        </div>

        {/* <div className="settingInput">
                  <h5>Address</h5>
                  <input
                    className="settingField"
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.address && formik.errors.address ? (
                  <div className="errorMessage">{formik.errors.address}</div>
                ) : null}
                <div className="cont-email">
                  <div className="settingInput">
                    <h5>Contact Number </h5>
                    <input
                      className="settingField2"
                      type="number"
                      name="contactNo"
                      value={formik.values.contactNo}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.contactNo && formik.errors.contactNo ? (
                    <div className="errorMessage">
                      {formik.errors.contactNo}
                    </div>
                  ) : null}
                  <div className="settingInput">
                    <h5>Email Address </h5>
                    <input
                      className="settingField2"
                      type="email"
                      name="emailaddress"
                      value={formik.values.emailaddress}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.emailaddress && formik.errors.emailaddress ? (
                    <div className="errorMessage">
                      {formik.errors.emailaddress}
                    </div>
                  ) : null}
                </div>
                <div className="cont-email">
                  <div className="settingInput">
                    <h5>Book Return Day Limit</h5>
                    <input
                      className="settingField2"
                      type="number"
                      name="bookReturnDayLimit"
                      value={formik.values.bookReturnDayLimit}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.bookReturnDayLimit &&
                  formik.errors.bookReturnDayLimit ? (
                    <div className="errorMessage">
                      {formik.errors.bookReturnDayLimit}
                    </div>
                  ) : null}
                  <div className="settingInput">
                    <h5>Book Late Return One Day Fine </h5>
                    <input
                      className="settingField2"
                      type="number"
                      name="bookLateReturnOneDayFine"
                      value={formik.values.bookLateReturnOneDayFine}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.bookLateReturnOneDayFine &&
                  formik.errors.bookLateReturnOneDayFine ? (
                    <div className="errorMessage">
                      {formik.errors.bookLateReturnOneDayFine}
                    </div>
                  ) : null}
                </div>

                <div className="cont-email">
                  <div className="settingInput">
                    <h5>Currency</h5>
                    <select
                      name="currency"
                      className="settingField2"
                      onChange={formik.handleChange}
                    >
                      {currencies.map((curr) => (
                        <option value={curr["value"]}>{curr["label"]}</option>
                      ))}
                    </select>
                  </div>

                  <div className="settingInput">
                    <h5>Timezone </h5>
                    <select
                      name="timezone"
                      className="settingField2"
                      onChange={formik.handleChange}
                    >
                      {timeies.map((tim) => (
                        <option value={tim["name"]}>{tim["offset"]}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="settingInput">
                  <h5>Per User Book Issue Limit </h5>
                  <input
                    className="settingFieldlast"
                    type="number"
                    name="perUserBookIssueLimit"
                    value={formik.values.perUserBookIssueLimit}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.perUserBookIssueLimit &&
                formik.errors.perUserBookIssueLimit ? (
                  <div className="errorMessage">
                    {formik.errors.perUserBookIssueLimit}
                  </div>
                ) : null}
                <div className="profilebtnDiv">
                  <button type="submit" className="profileUpdate">
                    {seetings === null ? "Create library" : "Update library"}
                  </button>
                </div> */}
      </form>
    </div>
  );
};

export default Listcategory;
