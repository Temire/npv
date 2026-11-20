import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { NpvInput } from "../../../components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { LOGIN_PAGE_URL } from "../../../utils/routes.url";

const validationSchema = Yup.object().shape({
  verification_code: Yup.string().required("Verification code is required")
});

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [initialValues] = React.useState({ verification_code: "" });

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
            values: { verification_code }
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
                Verify code
              </h2>
              <p className="font-normal text-[#313131] text-[12px] lg:text-[16px] mb-6">
                An authentication code has been sent to your email.
              </p>
              <NpvInput
                fullWidth
                label="Enter code"
                type="text"
                name="verification_code"
                placeholder="Enter code"
                value={verification_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button
                className="!text-[#F3F3F3] !normal-case !text-[16px] !font-semibold !font-montserrat !w-full !rounded-[12px] !bg-npv_purple !py-4 !mb-10 !mt-6"
                type="submit">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default VerifyEmail;
