import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "./store/contexts/authContext";
import axios from "axios";

const App = () => {
  const token = localStorage.getItem("token");

  axios.interceptors.request.use(
    function (config) {
      if (token) {
        config = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: "Token " + token,
          },
        };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
