import { FC, useState } from "react";
import { RouteType } from "../types/router.types";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./MainPage";
import HistoryPage from "./HistoryPage";
import AgePage from "./AgePage";
import SharePage from "./SharePage";
const routeConfig: RouteType[] = [
  { title: "MainPage", path: "/home", element: <MainPage /> },
  { title: "HistoryPage", path: "/history", element: <HistoryPage /> },
  {title: "SharePage", path: "/share", element: <SharePage />}
];

const Router: FC = () => {
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={ageConfirmed ? "/home" : "/age"} />}
      />
      {routeConfig.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={ageConfirmed ? route.element : <Navigate to="/age" />}
        />
      ))}
      <Route
        path="/age"
        element={<AgePage setAgeConfirmed={setAgeConfirmed} />}
      />
    </Routes>
  );
};

export default Router;
