import React, { useState } from 'react';
import validateRegistration from "./api/registration";

export default function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    validateRegistration(username, password, email);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
