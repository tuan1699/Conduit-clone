import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "./store/contexts/authContext";

const App = () => {
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token") || null;
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
