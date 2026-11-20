import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo-colored.png";
import { DASHBOARD_URL } from "../../utils/routes.url";

export const AuthLayout = () => {
  return (
    <main className="container mx-auto p-6 lg:p-10 ">
      <Link
        to={DASHBOARD_URL}
        className="flex items-center mb-10 lg:mb-[150px]">
        <img src={logo} alt="Logo" className="w-[35px]" />
        <h2 className="text-base font-bold leading-normal pl-3 no-underline text-npv_black">
          Nigeria Property Vault
        </h2>
      </Link>
      <Outlet />
    </main>
  );
};
