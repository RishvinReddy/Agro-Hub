import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SellCrop from "./pages/SellCrop";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sell" element={<PrivateRoute><SellCrop /></PrivateRoute>} />
        <Route path="/forum" element={<PrivateRoute><Forum /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;