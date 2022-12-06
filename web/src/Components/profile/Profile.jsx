import { useContext } from "react";
import React, { useState } from "react";
import { GlobalContext } from "../../Context";
import axios from "axios";
import { toast } from "react-toastify";
import "./profile.css";
import Person2SharpIcon from "@mui/icons-material/Person2Sharp";

const Profile = () => {
  let { state, dispatch } = useContext(GlobalContext);
  let [loading, setLoading] = useState(false);
  let [toggleReload, setToggleReload] = useState(false);
  const [uemail, setemail] = useState(state?.user?.data?.email);
  const [upassword, setpassword] = useState(state?.user?.data.password);

  let updateHandler = async () => {
    try {
      let updated = await axios.put(
        `${state.baseUrl}/profile/${state?.user?.data?._id}`,

        {
          email: uemail,
          password: upassword,
        },

        {
          withCredentials: true,
        }
      );
      toast.success("Profile Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("🚀 ~ updated", updated.data);

      setToggleReload(!toggleReload);
    } catch (e) {
      toast.error("Profile Updated Error", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("Error in api call: ", e);
      setLoading(false);
    }
  };

  return (
    <div>
      {state.user === null ? (
        <div> Loading... </div>
      ) : (
        <div className="profileMain">
          <div className="profileDiv">
            <div className="userHead">
              <h2> Profile</h2>
            </div>

            <div className="dash">
              <h5>
                <a href="#"> Dashboard</a> <span>/ Profile</span>
              </h5>
            </div>
            <div className="main-pro">
              <h5 className="edit-pro-hadding">
                <Person2SharpIcon /> Edit Profile Details
              </h5>
              <div className="profileInput">
                <h4>Email Address</h4>
                <input
                  className="profileField"
                  type="text"
                  value={uemail}
                  onChange={(event) => setemail(event.target.value)}
                />
              </div>
              <div className="profileInput">
                <h4>Password </h4>
                <input
                  className="profileField"
                  type="password"
                  value={upassword}
                  onChange={(event) => setpassword(event.target.value)}
                />
              </div>
              <div className="profilebtnDiv">
                <button className="profileUpdate" onClick={updateHandler}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
