import { FC, useState, Suspense, lazy, useEffect } from "react";
import { RouteType } from "../types/router.types";
import { Routes, Route, Navigate } from "react-router-dom";
import AgePage from "./AgePage";
import Loader from "../components/Loader";
import { getProducts } from "../api/products";
import MainPage from "./MainPage";
const HistoryPage = lazy(() => import("./HistoryPage")); // Другие страницы
const SharePage = lazy(() => import("./SharePage"));

const Router: FC = () => {
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Здесь вы можете заменить URL на ваш реальный API
        const response = await getProducts();
        // Обработка данных, если необходимо
        setLoading(true);
        return response;
      } catch (err) {
        console.error("Ошибка при загрузке данных", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />; // Показать прелоадер, пока данные загружаются
  }

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
