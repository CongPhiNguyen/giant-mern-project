import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./app.scss";

import Home from "./shared/pages/Home";
import Header from "./shared/components/Header";
import Login from "./authentication/pages/login";
import SignUp from "./authentication/pages/signup";
import NotFound from "./shared/pages/404";
import ImageViewing from "./album/pages/ImageViewing";
import ImageControlling from "./album/pages/ImageControlling";
import ImagesUploading from "./album/pages/ImagesUploading";
import AlbumsViewing from "./album/pages/AlbumsViewing";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AbstractModal from "./shared/modals/AbstractModal";

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
              <Route path="" element={<ImageControlling />} />
              <Route path="view" element={<ImageViewing />} />
              <Route path="upload" element={<ImagesUploading />} />
            </Route>
            <Route path="album">
              <Route path="" element={<AlbumsViewing />} />
            </Route>
            <Route path="*" element={<Navigate to="404-not-found" replace />} />
          </Route>
        </Routes>
        <AbstractModal />
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
