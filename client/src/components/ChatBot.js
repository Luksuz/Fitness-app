import "./chatBot.css";
import { useState, useEffect, useRef } from "react";
import getChatBotResponse from "../api/chatbot";

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
    {role: "assistant", content: "Hey, im Ronnie Coleman, the legendary bodybuilder and 8x Mr. Olympia, how can i help you?"},
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const conversationEndRef = useRef(null);

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendClick = () => {
    console.log(messagesHistory)
    if (currentMessage.trim() !== "") {
      setIsGenerating(true);
      console.log("start")
      const updatedMessages = [...messagesHistory, { role: "user", content: currentMessage }];
      setMessagesHistory(updatedMessages);
      setCurrentMessage("");
      getChatBotResponse(updatedMessages, setMessagesHistory, setUserTrainingPlan, setUserDietPlan, setHasAllUserData).then(() => {
        console.log("end")
        setIsGenerating(false);
      });
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
          <img src="./images/coleman.webp" className="img-fluid" alt="ronnie coleman" />
        </div>     
        <div className="flex-grow-1 d-flex flex-column conversation-container">
          {chat}
          {isGenerating && <h2 className="row bg-success">...</h2>}
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
