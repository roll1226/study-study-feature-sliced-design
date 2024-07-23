import { FC, Suspense } from "react";
import useAppRoutes from "./useAppRoutes";

const Router: FC = () => {
  const routes = useAppRoutes();
  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default Router;
