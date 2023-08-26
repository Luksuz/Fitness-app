import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
