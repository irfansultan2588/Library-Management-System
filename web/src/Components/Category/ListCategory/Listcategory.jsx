import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GlobalContext } from "../../../Context";
import { useState, useEffect } from "react";
import axios from "axios";
import "./listcategory.css";
import Createcategory from "../createCategory/Createcategory";
import Updatepage from "../updatepage/Updatepage";
import Category from "../Category";

const Listcategory = ({ setdetails }) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const [updatpage, setupdatpage] = useState(false);
  const [category, setcategory] = useState([]);

  useEffect(() => {
    const getcategory = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/categorys/${state?.user?.data?._id}`,
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

  return (
    <>
      <div className="seletInput">
        <div>
          <select id="select" name="select" type="select">
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

      {category?.map((item) => {
        return (
          <div className="maincategory">
            <div className="list-name">
              <h6>{item.categoryName}</h6>
            </div>
            <div className="list-name">
              <h6>
                <>
                  {item.status ? (
                    <button className="btn-enable">Enable</button>
                  ) : (
                    <button className="btn-disable">Disable</button>
                  )}
                </>
              </h6>
            </div>
            <div className="list-name">
              <h6>{item.createdOn}</h6>
            </div>
            <div className="list-name">
              <h6>{item.updatedOn}</h6>
            </div>
            <div className="list-name">
              <button className="btn-edit" onClick={() => setdetails(item)}>
                Edit
              </button>
              <button className="btn-delete">Delete</button>
            </div>
            {updatpage && <></>}
          </div>
        );
      })}
    </>
  );
};

export default Listcategory;
