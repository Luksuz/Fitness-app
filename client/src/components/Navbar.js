import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const iconSize = "30px";

export default function Nav() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handlePlansClick() {
    navigate("/userplans");
  }

  function handleLogoutClick() {
    sessionStorage.clear();
    navigate("/login");
  }

  function handleDashboardClick() {
    navigate("/dashboard");
  }

  function handleSettingsClick() {
    navigate("/settings");
  }

  return (
    <>
      <Navbar className="bg-body-tertiary ">
        <Container>
          <Navbar.Brand href="#home">GetActive</Navbar.Brand>
          <div className="d-none d-lg-block">
            <ul className="d-flex gap-5 text-center justify-content-center align-items-center">
              <li onClick={handleDashboardClick}>
                <img src="./images/bot.png" width={iconSize} className="me-1" alt="chat bot"/>
                Dashboard
              </li>
              <li onClick={handlePlansClick}>
                <img src="./images/nutrition.png" width={iconSize} alt="plans"/>
                My plans
              </li>
              <li onClick={handleLogoutClick}>
                <img src="./images/logout.png" width={iconSize} className="me-1" alt="logout"/>
                Logout
              </li>
              <li onClick={handleSettingsClick}>
                <img src="./images/settings.png" width={iconSize} className="me-1" alt="menu"/>
                Settings
              </li>
            </ul>
          </div>
          <div className="d-lg-none">
            <Button variant="primary" onClick={handleShow}>
              <img src="./images/menu.png" width={iconSize} />
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="d-flex flex-column gap-2">
                  <li onClick={handleDashboardClick} className="p-2 rounded-3">
                    <img src="./images/bot.png" width={iconSize} alt="chat bot"/>
                    Dashboard
                  </li>
                  <li onClick={handlePlansClick} className="p-2 rounded-3">
                    <img src="./images/nutrition.png" width={iconSize} alt="plans"/>
                    My plans
                  </li>
                  <li onClick={handleLogoutClick} className="p-2 rounded-3">
                    <img src="./images/logout.png" width={iconSize} alt="logout"/>
                    Logout
                  </li>
                  <li onClick={handleSettingsClick} className="p-2 rounded-3">
                    <img src="./images/settings.png" width={iconSize} alt="settings"/>
                    Settings
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
