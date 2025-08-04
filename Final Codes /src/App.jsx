import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

<><Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /><Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} /><Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} /></>