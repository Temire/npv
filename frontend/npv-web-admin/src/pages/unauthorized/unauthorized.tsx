import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../../assets/logo-colored.png";
import { DASHBOARD_URL } from "../../utils";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(DASHBOARD_URL);
  };

  const handleGoBack = () => {
    navigate(-2);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <img src={logo} className="w-[80px] h-auto mx-auto" alt="Logo" />

          <h2 className="mt-6 text-4xl font-extrabold text-red-600">
            Unauthorized
          </h2>
          <p className="mt-2 text-md text-gray-700">
            You are not authorized to view this page.
          </p>
        </div>
        <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Button
            variant="contained"
            onClick={handleGoBack}
            className="!w-full sm:!w-auto !normal-case !font-semibold !bg-red-600 hover:!bg-red-700">
            Go back
          </Button>
          <Button
            variant="outlined"
            onClick={handleGoHome}
            className="!w-full sm:!w-auto !normal-case !font-semibold !border-red-600 !text-red-600 hover:!border-red-700 hover:!text-red-700">
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
};
