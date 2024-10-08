import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import "./SignUp.css";

function SignUp() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("http://localhost:5500/api/users", form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        "http://localhost:5500/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="signup signup__home">
        <div className="signup__container">
          <div className="signup__title">
            <h2>Join the network</h2>
            <p>
              Already have an account?{" "}
              <Link className="account__link" to="/login">
                Sign in
              </Link>
            </p>

            <form className="signup__form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />{" "}
              <div className="row d-md-flex ">
                <input
                  className="d-sm-block d-xs-block "
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                />{" "}
                <input
                  className="d-sm-block d-xs-block"
                  id="lastname"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button>Agree and Join</button>
            </form>
            <p>
              I agree to the <a href="">privacy policy</a> and{" "}
              <a href="">terms of service</a>
            </p>
            <Link className="account__link" to="/login">
              Already have anccount?
            </Link>
          </div>
        </div>

        <div className="signup__about">
          <p id="about">About</p>
          <h1>Evangadi Networks Q&A</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            molestias! Expedita ex nostrum officia harum quos numquam pariatur
            quas sequi nulla itaque molestias ullam fugit aut voluptatem at,
            laudantium reprehenderit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            porro quidem maxime in nostrum asperiores quos totam quia, molestias
            facere, consectetur dolores quod soluta aspernatur obcaecati, ipsam
            mollitia? Assumenda, fugiat?
          </p>{" "}
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            obcaecati corporis a reiciendis vitae repellat. Repellendus
            voluptatum et sapiente possimus, reiciendis, necessitatibus voluptas
            laudantium accusamus totam eligendi consectetur dolorem quae.
          </p>
          <button>HOW IT WORKS</button>
        </div>
      </div>
       </>
  
  );
}

export default SignUp;
