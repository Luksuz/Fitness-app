import React, { useState } from 'react';
import validateRegistration from "./api/registration";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  function handleLoginNav(event) {
    event.preventDefault();
    navigate("/login");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let validated = await validateRegistration(username, password, email);
    console.log(validated);
    if(validated.code === 200){
      navigate("/login");
    }
    else{
      alert("email already in use");
    }
  }

  return (
    <div className="container d-flex flex-column">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-6" >
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                type="username"
                className="form-control"
                id="usernameInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPasswordInput">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="btn btn-success mt-2">
              Submit
            </Button>
          </form>
          <div className='d-flex flex-column justify-content-center align-items-center mt-4'>
            <p>Already have an account?</p>
            <Button onClick={handleLoginNav} >Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
