import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../Context";
import "./viewDetails.css";

const ViewIssue = ({ details }) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [profileData, setprofileData] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      try {
        let responseUser = await axios({
          url: `${state.baseUrl}/userdata/${details?.uniqueID}/${details?.bookIsbnNumber}`,
          method: "get",
          withCredentials: true,
        });

        if (responseUser.status === 200) {
          setprofileData(responseUser.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getdata();
  }, []);

  return (
    <div className="issue-containor">
      <div>
        <h4>Book Details</h4>
      </div>

      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>Book ISBN Number</b>
          </h6>
        </div>
        <div className="issue-number">
          <p>{details.bookIsbnNumber}</p>
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>Book Title</b>
          </h6>
        </div>
        <div className="issue-number">
          {/* <p>{profileData.isbn.bookName}</p> */}
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>Author</b>
          </h6>
        </div>
        <div className="issue-number">
          {/* <p>{profileData.isbn.author.authorName}</p> */}
        </div>
      </div>
      {/* /////////////////////// */}
      <div className="details-headding">
        <h4>User Details</h4>
      </div>

      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>User Unique ID</b>
          </h6>
        </div>
        <div className="issue-number">
          <p>{details.uniqueID}</p>
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>User Name</b>
          </h6>
        </div>
        <div className="issue-number">
          {/* <p>{profileData.data.fullName}</p> */}
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>User Address </b>
          </h6>
        </div>
        <div className="issue-number">
          {/* <p>{profileData.data.address}</p> */}
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>User Contract No. </b>
          </h6>
        </div>
        <div className="issue-number">
          {/* <p>{profileData.data.contactNo}</p> */}
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>User Email Address </b>
          </h6>
        </div>
        <div className="issue-number">
          {/* <p>{profileData.data.email}</p> */}
        </div>
      </div>
      {/* ///////////////////////////// */}
      <div className="details-headding">
        <h4> Issue Book Details</h4>
      </div>

      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>Book Issue Date</b>
          </h6>
        </div>
        <div className="issue-number">
          <p>{details.issueDate}</p>
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>Book Return Date</b>
          </h6>
        </div>
        <div className="issue-number">
          <p>{details.returnDate} </p>
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>Book Issue Status</b>
          </h6>
        </div>
        <div className="issue-number">
          <button className="btn-Issue">Issue</button>
        </div>
      </div>
      <div className="issue-details-containor">
        <div className="book-name">
          <h6>
            <b>Total Fine</b>
          </h6>
        </div>
        <div className="issue-number">
          <p>Rs.0 </p>
        </div>
      </div>
      <div className="btn-Edit">
        <button type="submit" className="btn-2">
          Book Return
        </button>
        ``
      </div>
    </div>
  );
};

export default ViewIssue;
