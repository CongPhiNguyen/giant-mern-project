import "./App.css";
import "./app.scss";
import { useEffect } from "react";
import Login from "./authentication/pages/login";
import SignUp from "./authentication/pages/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Header from "./shared/components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  useEffect(() => {
    document.title = "Authentication Application";
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="">
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* <Route path="*" element={<Navigate to="404-not-found" replace />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
