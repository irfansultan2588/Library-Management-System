import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../Context";
import { useState, useEffect } from "react";
import axios from "axios";

const ListRack = ({ setdetails }) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [updatpage, setupdatpage] = useState(false);
  const [locationRack, setlocationRack] = useState([]);

  useEffect(() => {
    const getlocationRack = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/locationRacks/${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });

        if (response.status === 200) {
          setlocationRack(response?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getlocationRack();
  }, []);

  const Handlerstatus = async (val) => {
    try {
      const update = await axios.put(`${state.baseUrl}/Rackstatus/${val._id}`, {
        status: !val?.status,
      });

      if (update.status === 200) {
        const updated = locationRack.map((cat) =>
          cat?._id === val?._id ? { ...cat, status: !val?.status } : cat
        );
        setlocationRack(updated);
      } else {
        console.log("error in api call");
      }
    } catch (e) {
      console.log("🚀 ~ e", e);
    }
  };

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
            <b>Location Rack Name</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Status</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Created On</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Updated On</b>
          </h6>
        </div>
        <div className="list-name">
          <h6>
            <b>Action</b>
          </h6>
        </div>
      </div>

      {locationRack?.map((item) => {
        return (
          <div className="maincategory">
            <div className="list-name">
              <h6>{item.locationRackName}</h6>
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
              <h6>{item.updatedAt}</h6>
            </div>
            <div className="list-name">
              <button className="btn-edit" onClick={() => setdetails(item)}>
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => Handlerstatus(item)}
              >
                Delete
              </button>
            </div>
            {updatpage && <></>}
          </div>
        );
      })}
    </>
  );
};

export default ListRack;
