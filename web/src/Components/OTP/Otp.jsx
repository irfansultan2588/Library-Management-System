import React, { useState, useContext } from "react";
import { GlobalContext } from "../../Context";
import OTPInput, { ResendOTP } from "otp-input-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./otp.css";
import { toast } from "react-toastify";

const Otp = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [OTP, setOTP] = useState("");

  const { state: email } = useLocation();
  const navigate = useNavigate();

  console.log(email, "email");

  const codesender = async () => {
    console.log(email, "email");

    console.log(OTP, "code");
    try {
      let response = await axios.post(`${state.baseUrl}/verifyotp`, {
        email: email.email,
        otp: OTP,
      });
      toast.success("OTP Verified", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    } catch (e) {
      toast.error("OTP unVerified", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("Error in api", e);
    }
  };

  return (
    <div className="main-otp">
      <div className="main-otp2">
        <div className="otp3">
          <div>
            <h3>Enter Your Code</h3>
          </div>

          <div className="otp-inp">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="string"
              disabled={false}
              secure
            />
          </div>

          <div className="otp-btn">
            <button className="send_btn" onClick={codesender}>
              {" "}
              Send Code
            </button>
          </div>
        </div>

        {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
      </div>
    </div>
  );
};

export default Otp;
