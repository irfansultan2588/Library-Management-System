import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./user.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../../Context";
import { useNavigate } from "react-router-dom";

const Userpage = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const navigate = useNavigate();

  const logouthandler = async () => {
    try {
      let response = await axios.post(
        `${state.baseUrl}/logout`,
        {},

        {
          withCredentials: true,
        }
      );
      dispatch({ type: "USER_LOGOUT" });
      navigate("/");
    } catch (e) {
      console.log("Error in api", e);
    }
  };

  return (
    <div>
      <Container>
        <Row className="line">
          <Col>
            <div>
              <h3 className="hadding">Library Management System</h3>
            </div>
          </Col>
          <Col>
            <div className="main-col">
              <NavLink exact to="/Userissue" activeClassName="activeClicked">
                Issue Book
              </NavLink>
              <NavLink
                exact
                to="/UserSearchbook"
                activeClassName="activeClicked"
              >
                Search Book
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked">
                Profile
              </NavLink>
              <NavLink exact to="/logout" onClick={logouthandler}>
                Logout
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Userpage;
