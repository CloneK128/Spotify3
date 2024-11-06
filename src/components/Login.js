import React, { useState } from "react";
import "../css/login.css";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Apiuser from "../Api/Apiuser";
import { useNavigate } from "react-router-dom";
import { setToken } from "../Service/Localtokenservice";
function Login(props) {
  let [Username, setUsername] = useState();
  let [Password, setPassword] = useState();
  let navigate = useNavigate();
  let checklogin = async (e) => {
    e.preventDefault();
    try {
      let dataUser = {
        email: Username,
        password: Password,
      };
      let response = (await Apiuser.apiLogin(dataUser)).data;
      let { token } = response.result.token;
      setToken(token);
      navigate("/");
    } catch (error) {
      alert("kiểm tra lại thông tin đăng nhập");
      navigate("/")
    }
  };
  return (
    <div className="Baoboc">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="inputbox">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="iconn" />
          </div>
          <div className="inputbox">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="iconn" />
          </div>
          <button type="submit" onClick={checklogin}>
            Login
          </button>
        </form>
      </div>
          
    </div>
  );
}
export default Login;
