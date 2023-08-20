import "./chatBot.css";
import { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesHistory, setMessagesHistory] = useState([]);

  const conversationEndRef = useRef(null);

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (currentMessage.trim() !== "") {
      setMessagesHistory([...messagesHistory, { role: "user", content: currentMessage }]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (conversationEndRef.current) {
        conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
}, [messagesHistory]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="row mb-auto">
        <h1 className="p-3 rounded-bottom" style={{ background: "green" }}>
          Coach Greg
        </h1>

        <div className="flex-grow-1 conversation-container">
        {messagesHistory.map((message, index) => (
            <div key={index} className={`row ${message.role === "user bg-secondary" ? "text-end" : "bg-success"}`}>
              <p>{message.content}</p>
            </div>
          ))}

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
