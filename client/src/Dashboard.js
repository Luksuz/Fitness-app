import ChatBot from "./components/ChatBot";
import { useEffect, useState } from "react";
import { insertUserPlans } from "./api/userPlans";
import Nav from "./components/Navbar";


export default function Dashboard() {
    const [userTrainingPlan, setUserTrainingPlan] = useState("");
    const [userDietPlan, setUserDietPlan] = useState("");
    const [hasAllUserData, setHasAllUserData] = useState(false);

    useEffect(() => {   
        if (hasAllUserData) {
            const userID = sessionStorage.getItem("userID")
            const maintananceCalories = localStorage.getItem("maintananceCalories")
            const goal = localStorage.getItem("goal")
            const cutBulkRate = localStorage.getItem("cutBulkRate")
            const workoutExperience = localStorage.getItem("workoutExperience")
            const healthIssues = localStorage.getItem("healthIssues")
            insertUserPlans(userID, userDietPlan, userTrainingPlan, maintananceCalories, goal, cutBulkRate, workoutExperience, healthIssues);
            localStorage.clear();
        //eslint-disable-next-line
        }}, [hasAllUserData]);
    
    return (
      <div className="container d-flex flex-column">
        <div className="row" style={{ background: "#CEDEBD" }}>
          <Nav />
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