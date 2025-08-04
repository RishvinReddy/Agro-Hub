import React from "react";
import { useAuth } from "../context/AuthProvider";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || user?.phone}!</h1>
      <p className="text-gray-700">Here you can manage crops, view orders, join forum discussions, and more.</p>
    </div>
  );
};

export default Dashboard;