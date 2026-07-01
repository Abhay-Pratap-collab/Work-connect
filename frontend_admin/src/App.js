

import City from "./components/cityComponent/City";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/LoginComponent/Login"
import Dashboard from "./components/LoginComponent/Dashboard";
import AppDashboard from "./components/LoginComponent/AppDashBoard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<Login />} path="/adminlogin" />
          <Route element={<AppDashboard />} path="/app" />




        </Routes>
      </Router>

    </div>
  );
}

export default App;
