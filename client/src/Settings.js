import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Nav from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { changePassword, deleteUser } from "./api/settings";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //alert state
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function handlePasswordSubmit(event) {
    event.preventDefault();
    if (password === confirmPassword) {
      const userID = sessionStorage.getItem("userID");
      changePassword(userID, password);
      setShow(true);
      setPassword("");
      setConfirmPassword("");
    } else {
      alert("passwords do not match");
    }
  }

  async function handleDeleteAccount(event) {
    event.preventDefault();
    if (
      password === confirmPassword &&
      // eslint-disable-next-line no-restricted-globals
      confirm("Are you sure you want to delete your account?")
    ) {
      const userID = sessionStorage.getItem("userID");
      const data = await deleteUser(userID, password);

      console.log(data);

      if (data.code === 200) {
        sessionStorage.clear();
        navigate("/");
      } else {
        alert("Incorrect password");
      }
    }
  }

  return (
    <>
      <Nav />
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Change password</Accordion.Header>
          <Accordion.Body>
            <form>
              <div className="form-group">
                <label htmlFor="passwordInput1">New password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordInput2">Confirm new password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="btn btn-success mt-2"
                onClick={handlePasswordSubmit}
              >
                Submit
              </Button>
            </form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Delete Account</Accordion.Header>
          <Accordion.Body>
            <p className="text-danger">
              Deleting you account will erase your credentials, as well as all
              of your training and diet plans.
            </p>
            <form>
              <div className="form-group">
                <label htmlFor="passwordInput3">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordInput4">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="btn btn-danger mt-2"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/*alert component*/}
      <div className="d-flex justify-content-center mt-3">
        <Alert show={show} variant="warning" className="row w-50">
          <Alert.Heading className="text-center">
            Password sucessfully changed!
          </Alert.Heading>
          <div className="d-flex justify-content-center">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
      </div>
    </>
  );
}
