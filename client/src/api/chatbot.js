async function getChatBotResponse( messagesHistory, setMessagesHistory, setUserTrainingPlan, setUserDietPlan, setHasAllUserData ) {
  console.log("this is the messagesHistory: " + messagesHistory)
    const response = await fetch("https://fitness-app-396719.ew.r.appspot.com/chatbot/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messagesHistory}),
    });
    const data = await response.json();
    const { role, content } = data.data.content;
    const { dietPlan, trainingPlan } = data.data;
    const { maintananceCalories, goal, cutBulkRate, workoutExperience, healthIssues } = data.data;
    if(maintananceCalories){
    localStorage.setItem("maintananceCalories", maintananceCalories);
    localStorage.setItem("goal", goal);
    localStorage.setItem("cutBulkRate", cutBulkRate);
    localStorage.setItem("workoutExperience", workoutExperience);
    localStorage.setItem("healthIssues", healthIssues);
    }

    
    console.log(data)

    setMessagesHistory([...messagesHistory, { role: role, content: content }]);
    if (dietPlan) {
      setUserTrainingPlan(trainingPlan);
      setUserDietPlan(dietPlan);
      setHasAllUserData(true);
    }
  }

export default getChatBotResponse;