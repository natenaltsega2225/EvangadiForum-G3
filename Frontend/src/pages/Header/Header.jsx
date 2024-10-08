import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import evangadiLogo from "../../CommonResource/evanLogo.jpeg";

const Header = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);

  return (
    <div className="header">
      <div className="header_container ">
        <Link to="/">
          <div className="header__logo">
            <img src={evangadiLogo} alt="" />
          </div>
        </Link>
        <div className="header__titles">
          <div className="header__home">
            <Link to="/"> Home</Link>
          </div>
          <div className="header__how">
            <Link to=""> How it works</Link>
          </div>

          {userData.user ? (
            <button className="signInBtn" onClick={logout}>
              LogOut
            </button>
          ) : (
            <button className="signInBtn">SignIn</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
