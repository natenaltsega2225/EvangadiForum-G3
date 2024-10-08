import axios from "axios";
import "./Home.css";
import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";


function Home({ logout }) {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");
    const fetch = async () => {
  
      const response = await axios.get("http://localhost:5500/api/question");

      setUserData({
        ...userData,
        questions: response.data.questions,
      });
    };
    fetch();
  }, [userData.user, navigate]);
  console.log(userData);

  const handleClick = (item) => {
    setUserData({
      ...userData,
      singleQuestion: {
        post_id: item.post_id,
        question_id: item.question_id,
      },
    });
    console.log(userData);
    navigate("/answer");
  };
  return (
        <div className="home">
      <hr />

      <div className="home__top">
        <div className="home__qbtn">
          <button className="mb-3">
            <Link to="/question">Ask Question</Link>
          </button>
        </div>

        <div className="home__welcome ">
          <h6>Welcome: {userData.user?.display_name}</h6>
        </div>
      </div>
      <div className="home__container">
        <p>Questions</p>
        <hr className="mt-1" />
        {userData.questions &&
          userData.questions?.map((item) => (
            <div>
              <div
                className="home__questions"
                onClick={() => handleClick(item)}
              >
        
                <div>
                  {" "}
                  <AccountCircleTwoToneIcon style={{ fontSize: "60px" }} />
                  <div className="mx-3">{item.user_name}</div>
                </div>

                <div className="home__question">{item.question}</div>
                <ArrowForwardIosTwoToneIcon className="home__questionsArrow mt-4 " />
              </div>
              <hr />
            </div>
          ))}

        <button className="logoutBtn" onClick={logout}>
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
