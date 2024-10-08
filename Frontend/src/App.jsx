import React, { useContext, useEffect } from "react";
import { UserProvider, UserContext } from "./context/UserContext"; // Ensure correct import
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Question from "./pages/Ask/Question.jsx";
import Answer from "./pages/Answer/Answer.jsx";
import Header from "./pages/Header/Header.jsx";
import Footer from "./pages/Footer/Footer.jsx";

function App() {
  const [userData, setUserData] = useContext(UserContext); // Ensure UserContext is correctly imported

  // Your existing logic here...
  const checkLoggedIn = async () => {
    try {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      } else {
        const userRes = await axios.get("http://localhost:5500/api/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      }
    } catch (error) {
      console.error("Error checking logged in status:", error);
      // Optionally handle any UI feedback or state changes here
    }
  };

  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <Header />
                <div className="bg">
                  <Login />
                </div>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div>
                <Header />
                <div className="bg">
                  <SignUp />
                </div>
              </div>
            }
          />
          <Route
            path="/question"
            element={
              <div>
                <Header logout={logout} />
                <Question />
              </div>
            }
          />
          <Route
            path="/answer"
            element={
              <div>
                <Header logout={logout} />
                <Answer />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <Header logout={logout} />
                <Home />
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Wrap your app with UserProvider in your index.js or main entry point
const MainApp = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default MainApp;
