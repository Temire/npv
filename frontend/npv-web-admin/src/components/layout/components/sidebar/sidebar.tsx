import { Link, useNavigate, useLocation } from "react-router-dom";
import { navRoutes } from "../../../../utils/navigator.data";
import { LOGIN_PAGE_URL } from "../../../../utils/routes.url";
// import { useAuth, useUser } from "../../../../context";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context";
import logo from "../../../../assets/logo-colored.png";

export const Sidebar = ({ closeSidebar }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const handleLogout = () => {
    navigate(LOGIN_PAGE_URL);
    toast("Logged out successfully!");
    logout();
  };
  return (
    // <div
    //   className={`hidden md:block w-[250px] h-screen min-h-screen bg-white py-10 px-6 fixed overflow-y-auto`}>
    <div className="h-screen min-h-screen py-10 px-6">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="w-full flex flex-col items-center">
            <div className="flex gap-2 items-center">
              <img src={logo} className="w-[35px]" />
              <div>
                <p className={"font-bold text-base"}>Nigeria Property Vault</p>
                <p className="text-[13px] font-normal text-npv_grey">Admin</p>
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-3 pt-16 py-10">
            {navRoutes.slice(0, 6).map((item, index: number) => {
              const Icon = item.icon;
              console.log(location.pathname === item.path);

              return (
                <li key={index} className="flex flex-col w-full">
                  <Link
                    onClick={closeSidebar}
                    to={item.path}
                    className={`w-full flex items-center justify-between py-[0.75rem] px-[0.75rem] text-[0.875rem] text-npv_grey rounded-lg font-medium ${
                      location.pathname === item.path
                        ? "bg-npv_purple !text-white  border-primary-500 !font-semibold"
                        : "hover:bg-npv_purple/15 hover:text-npv_black"
                    } `}>
                    <div className="inline-flex gap-4 items-center">
                      <div className="text-[20px]">
                        <Icon />
                      </div>
                      {item.name}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-3 pt-16 py-10">
            {navRoutes.slice(6, 7).map((item, index: number) => {
              const Icon = item.icon;
              console.log(location.pathname === item.path);

              return (
                <li key={index} className="flex flex-col w-full">
                  <Link
                    to={item.path}
                    onClick={() => {
                      closeSidebar();
                      item.name == "Logout" && handleLogout();
                    }}
                    className={`w-full flex items-center justify-between py-[0.75rem] px-[0.75rem] text-[0.875rem] text-npv_grey rounded-lg font-medium ${
                      location.pathname === item.path
                        ? "bg-npv_purple !text-white  border-primary-500"
                        : "hover:bg-npv_purple/15 hover:text-npv_black"
                    } `}>
                    <div className="inline-flex gap-4 items-center">
                      <div className="text-[20px]">
                        <Icon />
                      </div>
                      {item.name}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
