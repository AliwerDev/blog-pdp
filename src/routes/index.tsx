import MainLayout from "layouts/main";
import SurveyPage from "pages/survey";
import SurveysPage from "pages/surveys";
import { Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <SurveysPage /> },
        { path: "survey/:id", element: <SurveyPage /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
