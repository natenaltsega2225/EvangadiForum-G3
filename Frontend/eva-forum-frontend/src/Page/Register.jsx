// import { useRef } from "react";
// import axios from "../axiosConfig"; // Ensure the path is correct
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();
//   const usernameDom = useRef();
//   const firstnameDom = useRef();
//   const lastnameDom = useRef();
//   const emailDom = useRef();
//   const passwordDom = useRef();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     // Get the values from the input fields
//     const usernameValue = usernameDom.current.value;
//     const firstValue = firstnameDom.current.value;
//     const lastValue = lastnameDom.current.value;
//     const emailValue = emailDom.current.value;
//     const passwordValue = passwordDom.current.value;

//     // Validate input
//     if (
//       !usernameValue ||
//       !firstValue ||
//       !lastValue ||
//       !emailValue ||
//       !passwordValue
//     ) {
//       alert("Please provide all required information");
//       return;
//     }

//     try {
//       // Use the actual values in the POST request
//       await axios.post("/users/register", {
//         username: usernameValue,
//         firstname: firstValue,
//         lastname: lastValue,
//         email: emailValue,
//         password: passwordValue,
//       });

//       alert("Registration successful! Please login.");
//       navigate("/login"); // Redirect to the login page
//     } catch (error) {
//       console.log(error.message);
//       if (error.response) {
//         console.log(error.response.data); // More detailed response
//       }
//       alert("Registration failed. Please try again.");
//     }
//   }

//   return (
//     <section>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <span>Username: </span>
//           <input ref={usernameDom} type="text" placeholder="username" />
//         </div>
//         <br />
//         <div>
//           <span>First Name: </span>
//           <input ref={firstnameDom} type="text" placeholder="first name" />
//         </div>
//         <br />
//         <div>
//           <span>Last Name: </span>
//           <input ref={lastnameDom} type="text" placeholder="last name" />
//         </div>
//         <br />
//         <div>
//           <span>Email: </span>
//           <input ref={emailDom} type="email" placeholder="email" />
//         </div>
//         <br />
//         <div>
//           <span>Password: </span>
//           <input ref={passwordDom} type="password" placeholder="password" />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       <Link to={"/login"}>Login</Link>
//     </section>
//   );
// }

// export default Register;


// *********************************************************
import { useState } from "react";
import axios from "../axiosConfig"; // Ensure the path is correct
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !firstname || !lastname || !email || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="centered-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Email:
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Password:
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  );
}

export default Register;
