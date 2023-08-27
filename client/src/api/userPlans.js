
async function insertUserPlans(id, dietPlan, trainingPlan, maintananceCalories, goal, cutBulkRate, workoutExperience, healthIssues){
    const response = await fetch("http://localhost:5000/users/insertPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "userID": id, "maintananceCalories": maintananceCalories, "goal": goal, "cutBulkRate": cutBulkRate, "workoutExperience": workoutExperience, "healthIssues": healthIssues, "dietPlan": dietPlan, "trainingPlan": trainingPlan }),
    });
    const data = await response.json();
    return data;
}

async function getUserPlans(id){
    const response = await fetch(`http://localhost:5000/users/getPlans/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
}

export { insertUserPlans, getUserPlans };