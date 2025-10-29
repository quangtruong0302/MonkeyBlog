import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import CategoryUpdate from "@components/category/CategoryUpdate";
import UserManage from "@components/user/UserManage";
import UserAddNew from "@components/user/UserAddNew";
import UserUpdate from "@components/user/UserUpdate";
import PostUpdate from "@components/post/PostUpdate";
import Test from "@components/test/Test";
import PostDetailPage from "@pages/PostDetailPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/post/:slug",
        element: <PostDetailPage />,
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
        path: "/manage/update-post/:id",
        element: <PostUpdate />,
      },
      {
        path: "/manage/categories",
        element: <CategoryManage />,
      },
      {
        path: "/manage/add-category",
        element: <CategoryAddNew />,
      },

      {
        path: "/manage/update-category/:id",
        element: <CategoryUpdate />,
      },
      {
        path: "/manage/users",
        element: <UserManage></UserManage>,
      },
      {
        path: "/manage/add-user",
        element: <UserAddNew />,
      },
      {
        path: "/manage/update-user/:id",
        element: <UserUpdate />,
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
  {
    path: "/test",
    element: <Test />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </StrictMode>
);
