async function getChatBotResponse( messagesHistory, setMessagesHistory, setUserTrainingPlan, setUserDietPlan, setHasAllUserData ) {
  console.log("this is the messagesHistory: " + messagesHistory)
    const response = await fetch("http://localhost:5000/chatbot/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messagesHistory}),
    });
    const data = await response.json();
    const { role, content } = data.data.content;
    const { dietPlan, trainingPlan } = data.data;
    console.log(data)

    setMessagesHistory([...messagesHistory, { role: role, content: content }]);
    if (dietPlan && trainingPlan) {
      console.log("plans found")
      setUserTrainingPlan(trainingPlan);
      setUserDietPlan(dietPlan);
      setHasAllUserData(true);
    }
  }

export default getChatBotResponse;