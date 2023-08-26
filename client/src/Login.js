import React, { useState } from 'react';
import validateLogin from './api/login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

export default function Login() {
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const userData = await validateLogin(localUsername, localPassword);
    console.log("userData is : " + userData.data);
    if( userData.code === 200){
      setIsAuthenticated(true);
      navigate("/dashboard");
    }else{
      alert("Invalid username or password");
    }
  }

  return (
    <div className="container">
      <div className="row">
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
