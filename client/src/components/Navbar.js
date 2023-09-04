import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const iconSize = "30px";

export default function Nav({ isChatbotPanel, setChatbotShow, chatbotShow }) {
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
    navigate("/chatbotPanel");
  }

  function handleSettingsClick() {
    navigate("/settings");
  }

  return (
    <div className="shadow-lg mb-3">
      <Navbar>
        <Container>
          <Navbar.Brand href="#home" className="fs-3">
            GetActive
          </Navbar.Brand>
          <div className="d-none d-lg-block">
            <ul className="d-flex gap-2 text-center justify-content-center align-items-center">
              <li onClick={handleDashboardClick}>
                <img
                  src="./images/bot.png"
                  width={iconSize}
                  className="me-1"
                  alt="chat bot"
                />
                Chatbot panel
              </li>
              <li onClick={handlePlansClick}>
                <img
                  src="./images/nutrition.png"
                  width={iconSize}
                  alt="plans"
                />
                My plans
              </li>
              <li onClick={handleSettingsClick}>
                <img
                  src="./images/settings.png"
                  width={iconSize}
                  className="me-1"
                  alt="menu"
                />
                Settings
              </li>
              <li onClick={handleLogoutClick}>
                <img
                  src="./images/logout.png"
                  width={iconSize}
                  className="me-1"
                  alt="logout"
                />
                Logout
              </li>
              <li className="p-1 bg-info">
                <OverlayTrigger
                  trigger="click"
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Popover id={`popover-positioned-bottom`}>
                      <Popover.Header as="h3">{`App help`}</Popover.Header>
                      <Popover.Body>
                      Start by opening op the chatbot (robot icon) and chat with Ronnie as he asks you about your lifestyle to determine the best diet and training plans for you.
                            After, your diet and training plans will be stored in "My plans".
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button variant="info">help</Button>
                </OverlayTrigger>
              </li>
              {isChatbotPanel && (
                <Button
                  variant="primary"
                  onClick={() => setChatbotShow(!chatbotShow)}
                  className="me-3"
                >
                  <img src="./images/bot.png" width={iconSize} alt="menu" />
                </Button>
              )}
            </ul>
          </div>

          <div className="d-lg-none">
            {isChatbotPanel && (
              <Button
                variant="primary"
                onClick={() => setChatbotShow(!chatbotShow)}
                className="me-3"
              >
                <img src="./images/bot.png" width={iconSize} alt="chat bot" />
              </Button>
            )}
            <Button variant="primary" onClick={handleShow}>
              <img src="./images/menu.png" width={iconSize} alt="menu" />
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="d-flex flex-column gap-2">
                  <li onClick={handleDashboardClick} className="p-2 rounded-3">
                    <img
                      src="./images/bot.png"
                      width={iconSize}
                      alt="chat bot"
                    />
                    Dashboard
                  </li>
                  <li onClick={handlePlansClick} className="p-2 rounded-3">
                    <img
                      src="./images/nutrition.png"
                      width={iconSize}
                      alt="plans"
                    />
                    My plans
                  </li>
                  <li onClick={handleSettingsClick} className="p-2 rounded-3">
                    <img
                      src="./images/settings.png"
                      width={iconSize}
                      alt="settings"
                    />
                    Settings
                  </li>
                  <li onClick={handleLogoutClick} className="p-2 rounded-3">
                    <img
                      src="./images/logout.png"
                      width={iconSize}
                      alt="logout"
                    />
                    Logout
                  </li>
                  <li className="bg-info">
                    <OverlayTrigger
                      trigger="click"
                      key="right"
                      placement="right"
                      overlay={
                        <Popover id={`popover-positioned-right`}>
                          <Popover.Header as="h3">{`App help`}</Popover.Header>
                          <Popover.Body>
                            Start by opening op the chatbot (robot icon) and chat with Ronnie as he asks you about your lifestyle to determine the best diet and training plans for you.
                            After, your diet and training plans will be stored in "My plans".
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button variant="info">help</Button>
                    </OverlayTrigger>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
