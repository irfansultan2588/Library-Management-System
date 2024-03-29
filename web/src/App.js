import "./App.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./Context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Otp from "./Components/OTP/Otp";
import axios from "axios";
import Home from "./Components/Home/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboad from "./Components/AdminDashbord/AdminDashboad";
import UserSearchbook from "./Components/SarchbookUser/UserSearchbook";
import Userissue from "./Components/Issueuserpage/Userissue";
import UserProfile from "./Components/UserProfile/UserProfile";

function App() {
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

  // console.log(state?.user?.data?.role);

  return (
    <>
      <Router>
        <Routes>
          {state?.isLogin === true ? (
            <>
              <Route path="/logout" element={<Home />} />
              {/* <Route path="/login" element={<AdminDashboad />} /> */}
              {state?.user?.data?.role === "admin" ? (
                <>
                  <Route path="/dashboard/:type" element={<AdminDashboad />} />
                  <Route path="/" element={<AdminDashboad />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Userissue />} />
                  <Route path="/Userissue" element={<Userissue />} />
                  <Route path="/UserSearchbook" element={<UserSearchbook />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/logout" element={<Home />} />
                </>
              )}
            </>
          ) : null}

          {state?.isLogin === false ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/Otp" element={<Otp />} />
              <Route path="/" element={<Home />} />
            </>
          ) : null}

          {state?.isLogin === null ? (
            <>
              <Route
                path="*"
                element={
                  <div className="image_container234">
                    {/* <img src={loddingimage} alt='loding_image' /> */}
                  </div>
                }
              />
            </>
          ) : null}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
