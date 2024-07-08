// import { FC } from "react";
// import { RouteType } from "../types/router.types";
// import { Routes, Route, Navigate } from "react-router-dom";
// import MainPage from "./MainPage";
// import HistoryPage from "./HistoryPage";

// const routeConfig: RouteType[] = [
//   { title: "MainPage", path: "/home", element: <MainPage /> },
//   { title: "HistoryPage", path: "/history", element: <HistoryPage /> },
// ];

// const Router: FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/home" />} />
//       {routeConfig.map((route) => (
//         <Route key={route.path} path={route.path} element={route.element} />
//       ))}
//     </Routes>
//   );
// };

// export default Router;
