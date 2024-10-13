// import { useState } from "react";
// import axios from "../axiosConfig"; // Ensure the path is correct
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css"; // Import the CSS file

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("Please provide all required information");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/users/login", {
//         email,
//         password,
//       });

//       alert("Login successful!");
//       localStorage.setItem("token", data.token);
//       navigate("/"); // Redirect to the home page
//     } catch (error) {
//       alert(error?.response?.data?.msg || "Login failed.");
//     }
//   }

//   return (
//     <div className="centered-container">
//       <div className="login-box">
//         <h2>Login to Your Account</h2>
//         <Link to="/register" className="register-link">
//           <span className="black-text">Don't have an account? </span>
//           <span className="highlight-text">Create a new account</span>
//         </Link>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <Link to="/forgot-password" className="forgot-password-link">
//             Forgot password?
//           </Link>
//           <button type="submit" className="login-button">
//             LOGIN
//           </button>
//         </form>
//       </div>

//       <div className="about-box">
//         <h3>About</h3>
//         <p>
//           Evangadi Networks
//           <br />
//           No matter what stage of life you are in, whether you’re just starting
//           elementary school or being promoted to CEO of a Fortune 500 company,
//           you have much to offer to those who are trying to follow in your
//           footsteps.
//         </p>
//         <p>
//           Whether you are willing to share your knowledge or you are just
//           looking to meet mentors of your own, please start by joining the
//           network here.
//         </p>
//         <Link to="/register" className="create-account-button">
//           CREATE A NEW ACCOUNT
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;


// *************************************************************************************************
import { useState } from "react";
import axios from "../axiosConfig"; // Ensure the path is correct
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please provide all required information");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="centered-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/register" className="register-link">
          <span className="black-text">Don't have an account? </span>
          <span className="highlight-text">Create a new account</span>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot password?
          </Link>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;


