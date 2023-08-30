import React, { useState } from "react";
import validateLogin from "./api/login";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Login() {
  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  const navigate = useNavigate();

  function handleRegistrationNav(event) {
    event.preventDefault();
    navigate("/");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    sessionStorage.clear();
    const userData = await validateLogin(localUsername, localPassword);
    if (userData.code === 200) {
      sessionStorage.setItem("userID", userData.data._id);
      navigate("/dashboard");
      console.log("logged in");
    } else {
      alert("Invalid username or password");
    }
  }


  return (
    <div className="container">
      <div className="row d-flex flex-column justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                type="username"
                className="form-control"
                id="usernameInput"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                value={localPassword}
                onChange={(e) => setLocalPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success mt-2">
              Submit
            </button>
          </form>
          <div className="d-flex flex-column justify-content-center align-items-center mt-4">
            <p>Still dont have an account?</p>
            <Button onClick={handleRegistrationNav}>Register</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
