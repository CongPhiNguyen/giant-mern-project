import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./authentication/pages/login.js";
import Home from "./pages/home.js";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" name="Home" component={<Home />}></Route>
        <Route path="">
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="*" element={<Navigate to="404-not-found" replace />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
