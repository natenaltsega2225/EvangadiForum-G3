
// import { useContext } from "react"
// import { AppState } from "../App"

// function Home() {
//   const {user}=  useContext(AppState)
  
//   return (
//     <div>
//       <h1>Home</h1>
//       <br />
//       <br />
//       <br />
//       <h2>{user.username}</h2>

//     </div>
//   )
// }

// export default Home


// ******************************************************************

import { useContext } from "react";
import { AppState } from "../App";
import "./Home.css";
function Home() {
  const { user } = useContext(AppState);

  return (
    <div className="centered-container">
      <h1>Home</h1>
      <br />
      <br />
      <br />
      <h2>{user.username}</h2>
    </div>
  );
}

export default Home;
