import { Navigate, useRoutes } from "react-router-dom";
import SurveysPage from "../pages/surveys";
import SurveyPage from "../pages/survey";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: "surveys", element: <SurveysPage /> },
    { path: "survey/:id", element: <SurveyPage /> },
    { path: "*", element: <Navigate to="/surveys" replace /> },
  ]);
}
