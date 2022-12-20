import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../Context";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Listissue.css";

const ListIssue = ({ setdetails }) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [updatpage, setupdatpage] = useState(false);
  const [issueBook, setIssueBook] = useState([]);

  useEffect(() => {
    const getIssueBook = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/issuebook/${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });

        if (response.status === 200) {
          setIssueBook(response?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getIssueBook();
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
          <h6>
            <b>Book ISBN Number</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>User Unique ID</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Issue Date</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Return Date</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Late Return Date Fines</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Status</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Action</b>
          </h6>
        </div>
      </div>

      {issueBook?.map((item) => {
        return (
          <div className="maincategory">
            <div className="list-name">
              <h6>{item.bookIsbnNumber}</h6>
            </div>
            <div className="list-name">
              <h6>{item.uniqueID}</h6>
            </div>
            <div className="list-name">
              <h6>{item.issueDate}</h6>
            </div>
            <div className="list-name">
              <h6>{item.returnDate}</h6>
            </div>
            <div className="list-name">
              <h6>Rs,0</h6>
            </div>

            <div className="list-name">
              <h6>
                <>
                  {item.status ? (
                    <button className="btn-Issue">Issue</button>
                  ) : (
                    <button className="btn-View">Return</button>
                  )}
                </>
              </h6>
            </div>

            <div className="list-name">
              <button className="btn-view" onClick={() => setdetails(item)}>
                View
              </button>
            </div>
            {updatpage && <></>}
          </div>
        );
      })}
    </>
  );
};

export default ListIssue;
