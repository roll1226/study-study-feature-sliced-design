import { LoginPage } from "@pages/LoginPage";
import { MainPage } from "@pages/MainPage";
import NotFoundPage from "@pages/NotFoundPage";
import { SubPage } from "@pages/SubPage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sub" element={<SubPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
