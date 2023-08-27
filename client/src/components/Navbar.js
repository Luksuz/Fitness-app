import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handlePlansClick() {
    navigate("/userplans");
  }

  function handleDashboardClick() {
    navigate("/dashboard");
  }

  return (
    <>
        <Navbar className="bg-body-tertiary ">
          <Container>
            <Navbar.Brand href="#home">GetActive</Navbar.Brand>
            <div className="d-none d-lg-block">
              <ul className="gap-3">
                <li>
                  <Button onClick={handleDashboardClick}>
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button onClick={handlePlansClick}>
                    My plans
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
            <div className="d-lg-none">
              <Button variant="primary" onClick={handleShow}>
                Launch
              </Button>

              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <ul className="gap-3">
                <li>
                  <Button  onClick={handleDashboardClick}>
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button  onClick={handlePlansClick}>
                    My plans
                  </Button>
                </li>
                <li>
                  <Button
                    
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Button>
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
