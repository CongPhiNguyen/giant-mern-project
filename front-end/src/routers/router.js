import React from "react";

const SignUp = React.lazy(() => import("../authentication/pages/signup"));
const Login = React.lazy(() => import("../authentication/pages/login"));

const Home = React.lazy(() => import("../shared/pages/Home"));
const ImageViewing = React.lazy(() =>
  import("../album/pages/Image/ImageViewing")
);
const ImagesUploading = React.lazy(() =>
  import("../album/pages/Image/ImagesUploading")
);
const AlbumsViewing = React.lazy(() =>
  import("../album/pages/Album/AlbumsViewing")
);
const ImagesViewing = React.lazy(() =>
  import("../album/pages/Image/ImagesViewing")
);
const SimpleImageViewing = React.lazy(() =>
  import("../album/pages/Image/SimpleImageViewing")
);

// Những route chỉ truy xuất khi chưa đăng nhập
const publicRoute = [
  { path: "/sign-up", name: "SignUp", element: <SignUp /> },
  { path: "/sign-in", name: "SignIn", element: <Login /> },
];

// Những route dùng khi đã đăng nhập
const protectedRoute = [
  { path: "/home", name: "Home", element: <Home /> },
  {
    path: "/image/view/:userID/:imgID",
    name: "ImageViewing",
    element: <ImageViewing />,
  },
  {
    path: "/image/simple-view/:userID/:imgID",
    name: "ImageViewing",
    element: <SimpleImageViewing />,
  },
  {
    path: "/image/upload",
    name: "ImagesUploading",
    element: <ImagesUploading />,
  },
  {
    path: "/image/view-all-image",
    name: "ImagesViewing",
    element: <ImagesViewing />,
  },
  { path: "/album", name: "AlbumsViewing", element: <AlbumsViewing /> },
];

// route dùng cho mọi trường hợp
const commonRoute = [];

// Route dùng cho manager
const managerRoute = [];

const routes = {
  publicRoute,
  commonRoute,
  protectedRoute,
  managerRoute,
};

export default routes;
