import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Login from "./Login";
import Register from "./Register";
import UserPlans from "./UserPlans";
import ChatbotPanel from "./ChatbotPanel";
import Settings from "./Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";

function App() {

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userPlans" element={<UserPlans />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chatbotPanel" element={
              <ChatbotPanel />
          } />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
