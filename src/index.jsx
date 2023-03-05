import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/home/Home";
import Article from "./pages/article/Article";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import DetailArticle from "./pages/article/DetailArticle";

import { AuthProvider } from "./store/contexts/authContext";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <Route
    element={<App />}
    // loader={App.loader}
    // errorElement={<div>Some thing wrong :(</div>}
  >
    <Route index element={<Home />} />
    <Route path="/editor" element={<Article />} />
    <Route path="/settings" element={<Setting />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/article/:slug" element={<DetailArticle />} />
  </Route>
);

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
