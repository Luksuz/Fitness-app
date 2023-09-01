import ChatBot from "./components/ChatBot";
import { useEffect, useState } from "react";
import { insertUserPlans } from "./api/userPlans";
import Nav from "./components/Navbar";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

export default function ChatbotPanel() {
    const [userTrainingPlan, setUserTrainingPlan] = useState("");
    const [userDietPlan, setUserDietPlan] = useState("");
    const [hasAllUserData, setHasAllUserData] = useState(false);
    const [chatbotShow, setChatbotShow] = useState(false);
    const [show, setShow] = useState(false);


    useEffect(() => {   
        if (hasAllUserData) {
            const userID = sessionStorage.getItem("userID")
            const maintananceCalories = localStorage.getItem("maintananceCalories")
            const goal = localStorage.getItem("goal")
            const cutBulkRate = localStorage.getItem("cutBulkRate")
            const workoutExperience = localStorage.getItem("workoutExperience")
            const healthIssues = localStorage.getItem("healthIssues")
            insertUserPlans(userID, userDietPlan, userTrainingPlan, maintananceCalories, goal, cutBulkRate, workoutExperience, healthIssues);
            setShow(true);
            localStorage.clear();
        //eslint-disable-next-line
        }}, [hasAllUserData]);
    
    return (
      <div className="d-flex flex-column">
        <div className="row">
          <Nav
          isChatbotPanel={true}
          setChatbotShow={setChatbotShow}
          chatbotShow={chatbotShow}
          />
        </div>

        {!hasAllUserData && 
        <>
        <div className="d-flex justify-content-center">
        <Alert show={show} variant="success" className="row w-50 fade-out">
        <Alert.Heading className="text-center">Plans saved to "My plans"!</Alert.Heading>
        <div className="d-flex justify-content-center">
        <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
        </div>
        
        <div className="d-flex row z-3 justify-content-center align-items-center">
          {/*Alert*/}
        
          <div className="col-10 col-lg-5 border m-1 secondary">
            <h2 className="mb-4">Your Training Plan</h2>
            <pre dangerouslySetInnerHTML={{ __html: userTrainingPlan }}></pre>
          </div>
          <div className="col-10 col-lg-5 border m-1 secondary">
            <h2 className="mb-4">Your Diet Plan</h2>
            <pre>{userDietPlan}</pre>
          </div>
        </div>
        </>
        }
        <div className="row chatbot justify-content-end z-3">
          <div className="col-12 col-md-6 col-lg-4" style={chatbotShow? { height: "500px", background: "white"} : {height: "500px"}}>
            {
            chatbotShow &&
            <ChatBot 
              setUserTrainingPlan={setUserTrainingPlan}
              setUserDietPlan={setUserDietPlan}
              setHasAllUserData={setHasAllUserData}
            />
            }
          </div>
        </div>
      </div>
    );
  }