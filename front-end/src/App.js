import "./App.css";
import "./app.scss";
import { useEffect } from "react";
// import { BrowserRouter } from "react-router-dom";
// import Routers from "./routes";
import Login from "./authentication/pages/login";
import SignUp from "./authentication/pages/signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
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
  });
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" name="Home" component={<Home />}></Route>
        <Route path="">
          <Route path="home" element={<Home />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* <Route path="*" element={<Navigate to="404-not-found" replace />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
