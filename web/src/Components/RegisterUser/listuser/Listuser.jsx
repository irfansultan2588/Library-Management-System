import React from "react";
import axios from "axios";
import { GlobalContext } from "../../../Context";
import { useContext, useEffect } from "react";
import { useState } from "react";

const Listuser = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [user, setuser] = useState([]);

  useEffect(() => {
    const getusers = async () => {
      try {
        let values = await axios({
          url: `${state.baseUrl}/userdata${state?.user?.data?._id}`,
          method: "get",
          withCredentials: true,
        });
        if (values.status === 200) {
          setuser(values?.data);
        } else {
          console.log("Error in api");
        }
        console.log("🚀 ~ values?.data===", values?.data);
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getusers();
  }, []);

  // const Handlerstatus = async (state) => {
  //   console.log("🚀 ~ state", state);
  //   try {
  //     const update = await axios.put(
  //       `${state.baseUrl}/userstatus/${state?.user?.data?._id}`,
  //       {
  //         status: !state?.status,
  //       }
  //     );

  //     if (update.status === 200) {
  //       const updated = state.map((cat) =>
  //         cat?._id === state?.user?.data?._id
  //           ? { ...cat, status: !state?.status }
  //           : cat
  //       );
  //       setuser(updated);
  //       console.log("🚀 ~ updated", updated);
  //     } else {
  //       console.log("error in api call");
  //     }
  //   } catch (e) {
  //     console.log("🚀 ~ e", e);
  //   }
  // };

  return (
    <></>
    // <div className="maincategory">
    //   {user?.map((item) => {
    //     console.log("🚀 ~ item", item);
    //     return (
    //       <>
    //         <div className="list-name">
    //           <p>{state.user.data._id}</p>
    //         </div>
    //         <div className="list-name">
    //           <p>{item?.fullName}</p>
    //         </div>
    //         <div className="list-name">
    //           <p>{item?.email}</p>
    //         </div>
    //         <div className="list-name">
    //           <p>Password</p>
    //         </div>
    //         <div className="list-name">
    //           <p>{state.user.data.address}</p>
    //         </div>
    //         <div className="list-name">
    //           <p>{state.user.data.contactNo}</p>
    //         </div>
    //         <div className="list-name">
    //           <p>Yes</p>
    //         </div>
    //         <div className="list-name">
    //           <p>
    //             <>
    //               {state.user.data.status ? (
    //                 <button className="btn-enable">Enable</button>
    //               ) : (
    //                 <button className="btn-disable">Disable</button>
    //               )}
    //             </>
    //           </p>
    //         </div>
    //         <div className="list-name">
    //           <p>{state.user.data.createdOn}</p>
    //         </div>
    //         <div className="list-name">
    //           <p>{state.user.data.updatedAt}</p>
    //         </div>
    //         <div className="list-name">
    //           <button
    //             className="btn-delete"
    //             //  onClick={() => Handlerstatus(state)}
    //           >
    //             Delete
    //           </button>
    //         </div>
    //       </>
    //     );
    //   })}
    // </div>
  );
};

export default Listuser;
