import MainLayout from "layouts/main";
import BlogOnePage from "pages/blog-one";
import BlogsBlockPage from "pages/blogs-block";
import EventsBlock from "pages/events-block";
import HomePage from "pages/home";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {
  // let { lang } = useParams<{ lang: string }>();

  // useEffect(() => {
  //   changeLanguage(lang || "uz");
  // }, [lang]);

  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/blog/:id", element: <BlogOnePage /> },
        { path: "/blogs-block", element: <BlogsBlockPage /> },
        { path: "/faq/:company", element: <BlogsBlockPage /> },

        { path: "/events-block", element: <EventsBlock /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
