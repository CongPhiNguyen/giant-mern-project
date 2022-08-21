// import { useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import "./app.scss";

// import Home from "./shared/pages/Home";
// import Header from "./shared/components/Header";
// import Login from "./authentication/pages/login";
// import SignUp from "./authentication/pages/signup";
// import NotFound from "./shared/pages/404";
// import ImageViewing from "./album/pages/Image/ImageViewing";
// import ImageControlling from "./album/pages/Image/ImageControlling";
// import ImagesUploading from "./album/pages/Image/ImagesUploading";
// import AlbumsViewing from "./album/pages/Album/AlbumsViewing";
// import ImagesViewing from "./album/pages/Image/ImagesViewing";

// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import AbstractModal from "./shared/modals/AbstractModal";
// import SimpleImageViewing from "./album/pages/Image/SimpleImageViewing";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import Header from "./shared/components/Header";
import AbstractModal from "./shared/modals/AbstractModal";
import ControllBar from "./shared/components/ControllBar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-container">
        <div className="app-page-container">
          <ControllBar />
          <div className="app-content-container">
            <Routers />
          </div>
        </div>
        <AbstractModal />
      </div>
    </BrowserRouter>
  );
}

export default App;

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <div className="app-container">
//         <Routes>
//           <Route path="">
//             <Route path="" element={<Home />} />
//             <Route path="home" element={<Home />} />
//             <Route path="sign-in" element={<Login />} />
//             <Route path="sign-up" element={<SignUp />} />
//             <Route path="404-not-found" element={<NotFound />} />
//             <Route path="image">
//               <Route path="" element={<ImageControlling />} />
//               <Route path="view/:userID/:imgID" element={<ImageViewing />} />
//               <Route
//                 path="simple-view/:userID/:imgID"
//                 element={<SimpleImageViewing />}
//               />
//               <Route path="upload" element={<ImagesUploading />} />
//               <Route path="view-all-image" element={<ImagesViewing />} />
//             </Route>
//             <Route path="album">
//               <Route path="" element={<AlbumsViewing />} />
//             </Route>
//             <Route path="*" element={<Navigate to="404-not-found" replace />} />
//           </Route>
//         </Routes>
//         <AbstractModal />
//       </div>
//       <ToastContainer />
//     </Router>
//   );
// };
