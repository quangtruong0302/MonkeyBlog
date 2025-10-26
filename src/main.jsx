import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthProvider";
import SignUpPage from "@pages/SignUpPage";
import SignInPage from "@pages/SignInPage";
import HomePage from "@pages/HomePage";
import RootLayout from "@pages/RootLayout";
import NotFoundPage from "@pages/NotFoundPage";
import DashboardLayout from "@components/dashboard/DashboardLayout";
import DashboardPage from "@pages/DashboardPage";
import PostAddNew from "@components/post/PostAddNew";
import CategoryManage from "@components/category/CategoryManage";
import CategoryAddNew from "@components/category/CategoryAddNew";
import PostManage from "@components/post/PostManage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/*",
        element: <NotFoundPage></NotFoundPage>,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/manage/posts",
        element: <PostManage />,
      },

      {
        path: "/manage/add-post",
        element: <PostAddNew />,
      },
      {
        path: "/manage/add-category",
        element: <CategoryAddNew />,
      },

      {
        path: "/manage/categories",
        element: <CategoryManage />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUpPage></SignUpPage>,
  },

  {
    path: "/sign-in",
    element: <SignInPage></SignInPage>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
