import MainLayout from "layouts/main";
import BlogOnePage from "pages/blog-one";
import BlogsBlockPage from "pages/blogs-block";
import HomePage from "pages/home";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/blog/:id", element: <BlogOnePage /> },
        { path: "/blogs-block", element: <BlogsBlockPage /> },
        { path: "/faq/:company", element: <BlogsBlockPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
