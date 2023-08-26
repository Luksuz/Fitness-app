import ChatBot from "./components/ChatBot";
import { useState } from "react";


export default function Dashboard() {
    const [userTrainingPlan, setUserTrainingPlan] = useState("");
    const [userDietPlan, setUserDietPlan] = useState("");
    const [hasAllUserData, setHasAllUserData] = useState(false);
    
    return (
      <div className="container d-flex flex-column">
        <div className="row" style={{ background: "#CEDEBD" }}>
          <h1>Your Personal Trainer</h1>
          <ul className="d-flex">
            <li>Create a plan</li>
            <li>Your plans</li>
            <li>Login</li>
          </ul>
        </div>
  
        {hasAllUserData && <div className="row justify-content-center">
          <div className="col-10 col-lg-5 border m-1 secondary">
            <h2 className="mb-4">Your Training Plan</h2>
            <pre>{userTrainingPlan}</pre>
          </div>
          <div className="col-10 col-lg-5 border m-1 secondary">
            <h2 className="mb-4">Your Diet Plan</h2>
            <pre>{userDietPlan}</pre>
          </div>
        </div>}
  
        <div className={hasAllUserData ? "row chatbot chatbot-close justify-content-end" : "row chatbot justify-content-end"}>
          <div className="col-10 col-md-6 col-lg-4" style={{ height: "500px", background: "white" }}>
            <ChatBot 
              setUserTrainingPlan={setUserTrainingPlan}
              setUserDietPlan={setUserDietPlan}
              setHasAllUserData={setHasAllUserData}
            />
          </div>
        </div>
      </div>
    );
  }