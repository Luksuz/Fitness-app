import ChatBot from "./components/ChatBot";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <div className="row">
        <h1>Your Personal Trainer</h1>
      </div>
      <div className="row">
        <div className="col-5 col-lg-4" style={{height: "500px", background: "white"}}>
          <ChatBot />
        </div>
      </div>
    </div>
  );
}

export default App;
