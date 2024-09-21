import { FC, Suspense } from "react";
import { Loading } from "@shared/Loading";
import useAppRoutes from "./useAppRoutes";

const Router: FC = () => {
  const routes = useAppRoutes();
  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};

export default Router;
