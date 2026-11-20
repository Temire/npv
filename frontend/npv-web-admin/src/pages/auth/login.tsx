import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { NpvInput } from "../../components/inputs";
import { DASHBOARD_URL } from "../../utils/routes.url";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "../../context";
import { NpvButton } from "../../components";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminLogin } from "../../services";
import { IconButton } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface IUserIdentityDetails {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  gender?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required")
});

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { setToken, isLoggedIn } = useAuth();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [initialLoginValues] = React.useState<IUserIdentityDetails>({
    email: "",
    password: ""
  });

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate(DASHBOARD_URL);
    }
  }, [isLoggedIn]);

  const onLoginUser = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: adminLogin,
    onSuccess(data) {
      console.log(data);
      setUser(data?.user);
      localStorage.setItem("Us_d", JSON.stringify(data?.user));

      const jwtToken = data?.jwt?.token;

      console.log(jwtToken);

      setToken(jwtToken);

      toast.success("Login Successful");

      navigate(DASHBOARD_URL);
    },
    onError(error: any) {
      console.log(error);
      toast.error(error.response?.data?.responseMessage);
    }
  });

  const handleLoginUser = (values: IUserIdentityDetails) => {
    const payload = { ...values, username: values.email };
    const formattedPayload = { ...payload };
    onLoginUser.mutate(formattedPayload);
  };

  // const goToForgotPassword = () => {
  //   // navigate(FORGOT_PASSWORD_URL);
  // };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="">
        <div className="h-full max-w-[600px] mx-auto">
          <div className="">
            <Formik
              initialValues={initialLoginValues}
              validationSchema={loginValidationSchema}
              onSubmit={async (values) => {
                handleLoginUser(values);
                console.log(values);
              }}>
              {({
                handleBlur,
                handleSubmit,
                handleChange,
                values: { email, password }
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-10 text-center">
                    <h2 className="text-[40px] font-semibold text-npv_bold mb-2">
                      Login
                    </h2>
                    <p className="font-normal text-[#313131] text-[16px]">
                      Login to access your vault
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <NpvInput
                      fullWidth
                      label="Email"
                      type="text"
                      name="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <NpvInput
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <>
                          {showPassword ? (
                            <IconButton onClick={togglePassword}>
                              <FaEye className="w-6 h-6 text-app_black" />
                            </IconButton>
                          ) : (
                            <IconButton onClick={togglePassword}>
                              <FaEyeSlash className="w-6 h-6 text-app_black" />
                            </IconButton>
                          )}
                        </>
                      }
                    />
                  </div>
                  {/* <div className="flex justify-between items-center mb-10">
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <p className="text-[14px] font-medium text-[#313131]">
                          Remember me
                        </p>
                      }
                    />
                    <Button
                      variant="text"
                      className="!text-[#FF8682] !normal-case !text-[14px] !font-medium !font-montserrat"
                      onClick={goToForgotPassword}>
                      Forgot Password?
                    </Button>
                  </div> */}

                  <NpvButton
                    isFullWidth
                    type="submit"
                    extraClass="!w-full !mt-10"
                    isDisabled={onLoginUser.isPending}
                    loading={onLoginUser.isPending}>
                    Login
                  </NpvButton>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};
