import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { NpvInput } from "../../../../components";
import { Button } from "@mui/material";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match")
});

export const ChangePassword = () => {
  const [initialValues] = React.useState({
    password: "",
    confirmPassword: ""
  });
  return (
    <div className="w-full max-w-[500px]">
      <div className="pb-3 mb-5">
        <p className="text-[20px] font-semibold text-black">
          Update your password
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
        }}>
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values: { password, confirmPassword }
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-10 flex flex-col gap-4">
              <NpvInput
                fullWidth={false}
                label="New password"
                type="password"
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <NpvInput
                fullWidth
                label="Confirm new password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button
              className="!text-[#F3F3F3] !normal-case !text-[16px] !font-semibold !font-montserrat !rounded-[12px] !bg-npv_purple !px-8 !py-4 !mb-10 !w-fit"
              type="submit">
              Save
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
