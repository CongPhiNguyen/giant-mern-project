import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import routes from "./router";
import { useSelector } from "react-redux";
import NotFound from "../shared/pages/404";

const Routers = () => {
  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );
  console.log("userInfo", userInfo);
  return (
    <React.Suspense>
      <Routes>
        {!userInfo._id &&
          routes.publicRoute.map((route, index) => {
            return (
              route.element && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            );
          })}
        {userInfo._id &&
          routes.protectedRoute.map((route, index) => {
            return (
              route.element && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            );
          })}
        <Route path="/404-not-found" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to={"/404-not-found"} />} /> */}
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
