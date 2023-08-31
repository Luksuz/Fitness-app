import { useState, useEffect } from "react";
import { getUserPlans } from "./api/userPlans";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Navbar";
import { Button, Modal } from "react-bootstrap";

export default function UserPlans() {
  const [userPlans, setUserPlans] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const userID = sessionStorage.getItem("userID");
    getUserPlans(userID).then((data) => {
      console.log(data);
      setUserPlans(data.data);
    });
  }, []);

  const handleShowModal = (index) => {
    setActiveModalIndex(index);
  };

  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };

    function handleRonnieClick() {
    navigate("/chatbotPanel");
}

  const mapppedUserPlans = userPlans.map((plan, index) => {
    return (
      <div key={index} className="d-flex bordered rounded-2 col-6 col-4-md justify-content-center align-items-center">
        <Button variant="success" onClick={() => handleShowModal(index)}>
            <p className="fs-4">{plan.workoutExperience}</p>
            <p className="fs-4">{plan.goal}</p>
            <p className="fs-4">{plan.cutBulkRate}</p>
        </Button>

        <Modal
          show={activeModalIndex === index}
          onHide={handleCloseModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{"plan " + (index + 1)}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <pre>{plan.dietPlan}</pre>
            <br />
            <pre dangerouslySetInnerHTML={{ __html: plan.trainingPlan }}></pre>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  });

  return (
    <div>
      <Nav />
      <div>
        <div className="row d-flex">
        {mapppedUserPlans ? (
          mapppedUserPlans
        ) : (
          <h2>
            Currently no plans were made for you, go talk to
            <span onClick={handleRonnieClick}>
              Ronnie and he will help you out.
            </span>
          </h2>
        )}
        </div>
      </div>
    </div>
  );
}
