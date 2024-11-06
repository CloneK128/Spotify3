import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  // const { audioRef, track } = useContext(PlayerContext);
  //let  = false; // Thay đổi điều này dựa trên trạng thái đăng nhập của bạn
  let [isLoggedIn, setisLoggedIn] = useState(false);
  let checklogginn = () => {
    setisLoggedIn(true);
  };

  return (
    <>
      <Routes>
        <Route
          path="/Login"
          element={
            <Login checklogginn={checklogginn} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/*"
          element={
            <Home checklogginn={checklogginn} isLoggedIn={isLoggedIn} />
          } />
      </Routes>
    </>
  );
}

export default App;
