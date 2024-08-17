import { FC, useState, Suspense, lazy, useEffect } from "react";
import { RouteType } from "../types/router.types";
import { Routes, Route, Navigate } from "react-router-dom";
import AgePage from "./AgePage";
import Loader from "../components/Loader";

const MainPage = lazy(() => import('./MainPage')); // Динамическая загрузка компонента Home
const HistoryPage = lazy(() => import('./HistoryPage')); // Другие страницы
const SharePage = lazy(() => import('./SharePage'));



const Router: FC = () => {
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [minimumLoadingTime] = useState<number>(20000);

  useEffect(() => {
      const startTime = Date.now();
    const timer = setTimeout(() => {
      setLoading(false);
    }, minimumLoadingTime);

    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация загрузки данных
    };
    fetchData().then(() => {
      const totalLoadingTime = Date.now() - startTime; // Общее время загрузки
      if (totalLoadingTime < minimumLoadingTime) {
        setTimeout(() => setLoading(false), minimumLoadingTime - totalLoadingTime);
      } else {
        setLoading(false); // Завершаем загрузку, если реальное время загрузки больше минимального
      }
    });

    return () => clearTimeout(timer); 
  }, [minimumLoadingTime]);

  const routeConfig: RouteType[] = [
    { title: "MainPage", path: "/home", element: ageConfirmed ? <MainPage/ > : <Navigate to="/age" />},
    { title: "HistoryPage", path: "/history", element: ageConfirmed ? <HistoryPage />  : <Navigate to="/age" />},
    {title: "SharePage", path: "/share", element: ageConfirmed ? <SharePage />  : <Navigate to="/age" />}
  ];

  return (
    <Suspense fallback={<Loader />}>
    <Routes>
      <Route
        path="/"
        element={<Navigate to={ageConfirmed ? "/home" : "/age"} />}
      />
      
      {routeConfig.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
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
