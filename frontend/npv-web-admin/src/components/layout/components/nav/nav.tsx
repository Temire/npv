import * as React from "react";
import logo from "../../../../assets/logo-white.png";
import { Link, useNavigate } from "react-router-dom";
import {
  DASHBOARD_URL,
  // DATA_PORTAL_URL,
  LOGIN_PAGE_URL
} from "../../../../utils/routes.url";
import { Button, IconButton } from "@mui/material";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../../../context";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [show, setShow] = React.useState<boolean | null>(null);

  const goToLogin = () => {
    // navigate(LOGIN_PAGE_URL);

    if (isLoggedIn) {
      navigate(DASHBOARD_URL);
    } else {
      navigate(LOGIN_PAGE_URL);
    }
  };

  const goToDashboard = () => {
    if (isLoggedIn) {
      navigate(DASHBOARD_URL);
    } else {
      navigate(LOGIN_PAGE_URL);
    }
  };

  const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="bg- h-full w-full">
        {/* Code block starts */}
        <nav className="bgtransparent bg-npv_purple text-white xl:block hidden fixed w-full z-50">
          <div className="mx-auto container px-6 py-2 xl:py-3">
            <div className="flex items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center xl:hidden">
                <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out">
                  <div className="visible xl:hidden"></div>
                </div>
              </div>
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <Link
                  to="/"
                  className="flex items-center text-white hover:text-white/90">
                  <img src={logo} alt="Logo" className="w-[30px] md:w-[35px]" />
                  <h2 className="hidden sm:block text-base font-bold leading-normal pl-3">
                    Nigeria Property Vault
                  </h2>
                </Link>
              </div>

              <div className="flex gap-7 items-center">
                <div className="hidden xl:flex items-center gap-7">
                  <a
                    onClick={(e) => onPress(e)}
                    href="#AboutUs"
                    data-to-scrollspy-id="AboutUs"
                    className="flex px-0 items-center py2 text-base leading-5 text-white hover:text-white/75  focus:outline-none transition duration-150 ease-in-out">
                    About us
                  </a>
                  <a
                    onClick={(e) => onPress(e)}
                    href="#HowItWorks"
                    data-to-scrollspy-id="HowItWorks"
                    className="flex px-0 items-center py2 text-base font-medium leading-5 text-white hover:text-white/75  focus:outline-none transition duration-150 ease-in-out">
                    How it works
                  </a>
                  <a
                    onClick={(e) => onPress(e)}
                    href="#Resources"
                    data-to-scrollspy-id="Resources"
                    className="flex px-0 items-center py2 text-base font-medium leading-5 text-white hover:text-white/75  focus:outline-none transition duration-150 ease-in-out">
                    Resources
                  </a>
                </div>
                {/* </div>
              <div className="hidden xl:flex items-center justify-end"> */}
                <div className="relative my-2">
                  <a
                    href="javascript: void(0)"
                    onClick={goToDashboard}
                    className="flex px-0 items-center py2 text-base font-medium leading-5 text-white hover:text-white/75  focus:outline-none transition duration-150 ease-in-out">
                    Data portal
                  </a>
                </div>
                <div className="relative my-2 !h-full">
                  <Button
                    className="!focus:outline-none !bg-white !border-transparent !rounded-[8px] !text-npv_purple !border !transition !duration-150 !ease-in-out !hover:bg-gray-300 !px-5 !py-2 !text-base !font-semibold !normal-case"
                    onClick={goToLogin}>
                    {isLoggedIn ? "Access your fault" : "Create your vault"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-npv_purple text-white fixed top-0 z-40">
            <div className="w-24">
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-start">
                <Link
                  to="/"
                  className="flex items-center text-white hover:text-white/90">
                  <img src={logo} alt="Logo" className="w-[30px] md:w-[35px]" />
                  <h2 className="hidden sm:block text-base font-bold leading-normal pl-0 sm:pl-3">
                    Nigeria Property Vault
                  </h2>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative mr-6 ">
                <Button
                  className="!focus:outline-none !text-[14px] !bg-white !border-transparent !rounded-full !text-npv_purple !border !transition !duration-150 !ease-in-out !hover:bg-gray-300 !px-4 !py-2 !text-base !font-semibold !normal-case"
                  onClick={goToDashboard}>
                  Data portal
                </Button>
              </div>
              <div
                id="menu"
                className="text-gray-800"
                onClick={() => setShow(!show)}>
                {show ? (
                  ""
                ) : (
                  <IconButton>
                    <CgMenuRightAlt className="text-white text-[24px]" />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full xl:hidden h-full z-40  transform  translate-x-0 fixed"
                : "w-full xl:hidden h-full absolute z-40  transform -translate-x-full"
            }>
            <div
              className="bg-gray-800 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-start">
                            <Link
                              to="/"
                              className="flex items-center text-npv_purple hover:text-white/90">
                              <img src={logo} alt="Logo" className="w-[35px]" />
                              <h2 className="text-[12px] font-bold leading-normal pl-0 sm:pl-3">
                                Nigeria Property Vault
                              </h2>
                            </Link>
                          </div>
                        </div>
                        <div
                          id="cross"
                          className="text-gray-800"
                          onClick={() => setShow(!show)}>
                          <IoMdClose />
                        </div>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-8">
                      <a className="cursor-pointer">
                        <li className="text-gray-800 pt-10">
                          <div className="flex items-center">
                            <a
                              onClick={(e) => onPress(e)}
                              href="#AboutUs"
                              data-to-scrollspy-id="AboutUs"
                              className="flex px-0 font-semibold items-center text-base leading-5 text-npv_black hover:text-npv_black/75  focus:outline-none transition duration-150 ease-in-out  ml-3">
                              About us
                            </a>
                          </div>
                        </li>
                      </a>
                      <a className="cursor-pointer">
                        <li className="text-gray-800">
                          <div className="flex items-center justify-between">
                            <a
                              onClick={(e) => onPress(e)}
                              href="#HowItWorks"
                              data-to-scrollspy-id="HowItWorks"
                              className="flex px-0 font-semibold items-center text-base leading-5 text-npv_black hover:text-npv_black/75  focus:outline-none transition duration-150 ease-in-out  ml-3">
                              How it works
                            </a>
                          </div>
                        </li>
                      </a>
                      <a className="cursor-pointer">
                        <li className="text-gray-800">
                          <div className="flex items-center justify-between">
                            <a
                              onClick={(e) => onPress(e)}
                              href="#Resources"
                              data-to-scrollspy-id="#Resources"
                              className="flex px-0 font-semibold items-center text-base leading-5 text-npv_black hover:text-npv_black/75  focus:outline-none transition duration-150 ease-in-out  ml-3">
                              Resources
                            </a>
                          </div>
                        </li>
                      </a>
                      <li className="text-gray-800 cursor-pointer">
                        <Button
                          className="!focus:outline-none !w-full !bg-transparent !border-npv_purple !border-solid !rounded-full !text-npv_purple !border !transition !duration-150 !ease-in-out !hover:bg-gray-300 !px-5 !py-2 !text-base !font-semibold !normal-case"
                          onClick={goToDashboard}>
                          Data portal
                        </Button>
                      </li>
                      <li className="text-gray-800 cursor-pointer">
                        <Button
                          className="!focus:outline-none !w-full !bg-npv_purple !border-transparent !rounded-full !text-white !border !transition !duration-150 !ease-in-out !hover:bg-gray-300 !px-5 !py-2 !text-base !font-semibold !normal-case"
                          onClick={goToDashboard}>
                          Access your vault
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Code block ends */}
      </div>
    </>
  );
};
