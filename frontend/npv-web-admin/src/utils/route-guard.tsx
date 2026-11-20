import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context";
import { LOGIN_PAGE_URL } from "./routes.url";
import { LineWave } from "react-loader-spinner";

export const RouteGuard = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <section className="w-screen h-screen flex justify-center items-center">
        <LineWave
          visible={true}
          height="200"
          width="200"
          color="#800080"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </section>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={LOGIN_PAGE_URL} />;
};
