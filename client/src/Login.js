import React, { useState } from 'react';
import validateLogin from './api/login';

export default function Login({ setIsLoggedIn, setUsername }) {
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    let userData;
    userData = await validateLogin(localUsername, localPassword);
    console.log("userData is : " + userData.data);
    if( userData.code === 200){
        setUsername(userData.data.username);
        setIsLoggedIn(true);
        console.log("sucessfully logged in")
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
