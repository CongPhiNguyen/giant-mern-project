import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import "./app.scss";

import Home from "./shared/pages/Home";
import Header from "./shared/components/Header";
import Login from "./authentication/pages/login";
import SignUp from "./authentication/pages/signup";
import NotFound from "./shared/pages/404";
import ViewImage from "./album/pages/ViewImage";
import UploadImage from "./album/pages/UploadImage";

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
      <div className="app-container">
        <Routes>
          <Route path="">
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="404-not-found" element={<NotFound />} />
            <Route path="image">
              <Route path="" element={<ViewImage />} />
              <Route path="upload" element={<UploadImage />} />
            </Route>
            <Route path="*" element={<Navigate to="404-not-found" replace />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
