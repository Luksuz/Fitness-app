import "./chatBot.css";
import { useState, useEffect, useRef } from "react";
import getChatBotResponse from "../api";

function ChatBot({setUserTrainingPlan, setUserDietPlan, setHasAllUserData }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesHistory, setMessagesHistory] = useState([
    {role: "system", content: `You will be impersonating Ronnie Coleman and asking the user about his training preferences.
                                  You will have to figure out the users maintanance calories, goal(cut/bulk),
                                  cut/bulk rate(kg/week), workout experience and health issues.
                                  you have to convert the users responses to fit the model below eg. 'i want to gain weight' -> 'bulk',
                                  'i sometimes have a strong pinching feeling in my lower back' -> 'lower back pain',
                                  'i have a little bit of workout experience' -> 'beginner',
                                  if the user starts some other topic, just get back to the main topic(fitness).
                                  Once you have all this data,dont say anything else, rather end the conversation exactly like this:
                                  Thats it, i got all the information i need to create your program, these are your preferences:
                                  Maintanance calories: 
                                  Goal: (bulk/cut/mantain)    
                                  Cut/bulk rate: (kg/week)
                                  Workout experience: 
                                  Health issues: `

     },
    {role: "user", content: "Hey Ronnie!"},
    {role: "assistant", content: "Hey, im ronnie coleman?"},
  ]);

  const conversationEndRef = useRef(null);

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendClick = () => {
    console.log(messagesHistory)
    if (currentMessage.trim() !== "") {
      const updatedMessages = [...messagesHistory, { role: "user", content: currentMessage }];
      setMessagesHistory(updatedMessages);
      setCurrentMessage("");
      getChatBotResponse(updatedMessages, setMessagesHistory, setUserTrainingPlan, setUserDietPlan, setHasAllUserData);
    }
};

  

  useEffect(() => {
    if (conversationEndRef.current) {
        conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
}, [messagesHistory]);

let chat = messagesHistory.map((message, index) => (
  index > 1 &&
    <div key={index} className={`row ${message.role === "user" ? "justify-content-end bg-secondary" : "bg-success"}`} style={message.role === "user"? {background: "" } : {background: "#435334"}}>
      <p>{message.content}</p>
    </div>
  ));
console.log(messagesHistory)

  return (
    <div className="d-flex flex-column h-100">
      <div className="row mb-auto">
        <div className="d-flex justify-content-between secondary">
        <h2 className="p-3 rounded-bottom">
          Ronnie
        </h2>
          <img src="./images/coleman.webp" className="img-fluid" />
        </div>     
        <div className="flex-grow-1 d-flex flex-column conversation-container">
          {chat}
          <div ref={conversationEndRef}></div>

        </div>
      </div>

      <div className="row">
        <div className="input-group p-2">
          <textarea className="form-control" aria-label="Send" value={currentMessage} onChange={handleInputChange}></textarea>
          <div className="input-group-append">
            <button className="btn btn-success" type="button" onClick={handleSendClick}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
