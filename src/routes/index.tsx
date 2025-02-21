import { changeLanguage } from "i18next";
import MainLayout from "layouts/main";
import BlogOnePage from "pages/blog-one";
import BlogsBlockPage from "pages/blogs-block";
import EventsBlock from "pages/events-block";
import HomePage from "pages/home";
import { useEffect } from "react";
import { Navigate, useParams, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {
  let { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    changeLanguage(lang || "uz");
  }, [lang]);

  return useRoutes([
    {
      path: "/:lang",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/:lang/blog/:id", element: <BlogOnePage /> },
        { path: "/:lang/blogs-block", element: <BlogsBlockPage /> },
        { path: "/:lang/faq/:company", element: <BlogsBlockPage /> },

        { path: "/:lang/events-block", element: <EventsBlock /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
