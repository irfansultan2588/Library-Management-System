import React from "react";
import axios from "axios";
import { GlobalContext } from "../../../Context";
import { useContext, useEffect } from "react";

const Listuser = () => {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getProfile = async () => {
      try {
        let values = await axios({
          url: `${state.baseUrl}/profile`,
          method: "get",
          withCredentials: true,
        });
        if (values.status === 200) {
          dispatch({
            type: "USER_LOGIN",
            payload: values,
          });
        } else {
          dispatch({ type: "USER_LOGOUT" });
        }
      } catch (e) {
        console.log("Error in api", e);
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    getProfile();
  }, []);

  return (
    <div className="maincategory">
      <div className="list-name">
        <p>{state.user.data.fullName}</p>
      </div>
      <div className="list-name">
        <p>{state.user.data.email}</p>
      </div>
      <div className="list-name">
        <p>Password</p>
      </div>
      <div className="list-name">
        <p>{state.user.data.address}</p>
      </div>
      <div className="list-name">
        <p>{state.user.data.contactNo}</p>
      </div>
      <div className="list-name">
        <p>Yes</p>
      </div>
      <div className="list-name">
        <p>
          <>
            {state.user.data.status ? (
              <button className="btn-enable">Enable</button>
            ) : (
              <button className="btn-disable">Disable</button>
            )}
          </>
        </p>
      </div>
      <div className="list-name">
        <p>{state.user.data.createdOn}</p>
      </div>
      <div className="list-name">
        <p>{state.user.data.updatedAt}</p>
      </div>
      <div className="list-name">
        <button className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default Listuser;
