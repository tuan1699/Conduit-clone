import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/home/Home";
import NewArticle from "./pages/article/NewArticle";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DetailArticle from "./pages/article/DetailArticle";
import ProfileOther from "./pages/profile/ProfileOther";

import { AuthProvider } from "./store/contexts/authContext";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import EditPage from "./pages/edit/EditPage";

const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<Home />} />
    <Route path="/editor" element={<NewArticle />} />
    <Route path="/editor/:slug" element={<EditPage />} />
    <Route path="/settings" element={<Setting />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/article/:slug" element={<DetailArticle />} />
    <Route path="/:profile" element={<ProfileOther />} />
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
