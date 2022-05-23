import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import 'bootswatch/dist/lux/bootstrap.min.css';

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-primary">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Green Witch</b>
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <li>
          <button className="btn btn-outline-success" onClick={() => navigate("/")}>Home</button>
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <li>
          <button className="btn btn-outline-success" onClick={() => navigate("/calendar")}>Calendar</button>
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp; 
        <li>
          <button className="btn btn-outline-success" onClick={() => navigate("/events")}>Events</button>
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <li>
          {user ? (
            <button className="btn btn-outline-success" onClick={logoutUser}>Logout</button>
          ) : (
            <button  className="btn btn-outline-success" onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

