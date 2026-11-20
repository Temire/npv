import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { NpvInput } from "../../../components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { LOGIN_PAGE_URL } from "../../../utils/routes.url";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Password is required")
});

const SetNewPassword = () => {
  const navigate = useNavigate();

  const [initialValues] = React.useState({ password: "", confirmPassword: "" });

  const goBack = () => {
    navigate(LOGIN_PAGE_URL);
  };
  return (
    <section className="w-full h-[45vh] flex items-center justify-center">
      <div className="w-full max-w-[512px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values: any) => {
            console.log(values);
          }}>
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            values: { password, confirmPassword }
          }) => (
            <form onSubmit={handleSubmit}>
              <Button
                variant="text"
                className="!text-[#313131] !normal-case !text-[14px] !font-medium !font-montserrat !w-fit !mb-4 !flex !items-center !gap-2"
                onClick={goBack}>
                <div>
                  <FaChevronLeft />
                </div>
                Back to login
              </Button>
              <h2 className="font-semibold text-[#313131] text-[24px] lg:text-[40px] mb-4">
                Set a password
              </h2>
              <p className="font-normal text-[#313131] text-[12px] lg:text-[16px] mb-6">
                Your previous password has been reseted. Please set a new
                password for your account.
              </p>
              <div className="flex flex-col gap-4">
                <NpvInput
                  fullWidth
                  label="Password"
                  type="text"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <NpvInput
                  fullWidth
                  label="Confirm password"
                  type="text"
                  name="confirmPassword"
                  placeholder="Enter password"
                  value={confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <Button
                className="!text-[#F3F3F3] !normal-case !text-[16px] !font-semibold !font-montserrat !w-full !rounded-[12px] !bg-npv_purple !py-4 !mb-10 !mt-6"
                type="submit">
                Set password
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SetNewPassword;
