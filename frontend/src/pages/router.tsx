import { FC, useState, Suspense, lazy } from "react";
import { RouteType } from "../types/router.types";
import { Routes, Route, Navigate } from "react-router-dom";
import AgePage from "./AgePage";
import Loader from "../components/Loader";
import MainPage from "./MainPage";
import Journal from "./Journal";
const HistoryPage = lazy(() => import("./HistoryPage")); // Другие страницы
const SharePage = lazy(() => import("./SharePage"));

const Router: FC = () => {
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(false);

  const routeConfig: RouteType[] = [
    {
      title: "MainPage",
      path: "/home",
      element: ageConfirmed ? <MainPage /> : <Navigate to="/age" />,
    },
    {
      title: "HistoryPage",
      path: "/history",
      element: ageConfirmed ? <HistoryPage /> : <Navigate to="/age" />,
    },
    {
      title: "SharePage",
      path: "/share",
      element: ageConfirmed ? <SharePage /> : <Navigate to="/age" />,
    },
    {
      title: "Journal",
      path: "/journal",
      element: ageConfirmed ? <Journal /> : <Navigate to="/age" />,
    },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={ageConfirmed ? "/home" : "/age"} />}
        />

        {routeConfig.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route
          path="/age"
          element={<AgePage setAgeConfirmed={setAgeConfirmed} />}
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
