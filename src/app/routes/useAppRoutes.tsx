import { lazyImport } from "@shared/utils/lazyImport";

import { useRoutes } from "react-router-dom";

const { LoginPage } = lazyImport(() => import("@pages/LoginPage"), "LoginPage");
const { MainPage } = lazyImport(() => import("@pages/MainPage"), "MainPage");
const { NotFoundPage } = lazyImport(
  () => import("@pages/NotFoundPage"),
  "NotFoundPage"
);
const { SubPage } = lazyImport(() => import("@pages/SubPage"), "SubPage");

const useAppRoutes = () => {
  return useRoutes([
    { path: "/", element: <MainPage /> },
    { path: "/sub", element: <SubPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);
};

export default useAppRoutes;
