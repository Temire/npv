import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { NpvInput, NpvSelect } from "../../components/inputs";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
// import google from "../../assets/icons/google.svg";
import { genders } from "../../config/data";
import { DASHBOARD_URL, LOGIN_PAGE_URL } from "../../utils/routes.url";
import { Link, useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { userLogin, userRegistrationStep1 } from "../../services";
import { useUser } from "../../context";
import { NpvButton } from "../../components";
// import toast from "react-hot-toast";
import { useAuth } from "../../context/auth-context";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAdmin } from "../../services";
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

type PasswordVisibility = {
  password: boolean;
  confirmPassword: boolean;
};

const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  // phone: Yup.string().required("Phone number is required"),
  phone: Yup.string()
    .matches(
      /^$|234[0-9]{10,15}/,
      "Phone number must start with 234 as must be at least 11 digits."
    )
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password")
    .oneOf([Yup.ref("password")], "Password must match")
});

export const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { isLoggedIn } = useAuth();

  const [terms, setTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState<PasswordVisibility>({
    password: false,
    confirmPassword: false
  });
  const [initialSignupValues] = React.useState<IUserIdentityDetails>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate(DASHBOARD_URL);
    }
  }, [isLoggedIn]);

  const onCreateAdmin = useMutation({
    mutationKey: ["userRegistrationStep1"],
    mutationFn: createAdmin,
    onSuccess(data) {
      /*
       * When the first registration step is complete, do the following:
       * -> Show a toast notifier
       * -> Save the user details to local storage/ React context so that the userId and other parameters can be retrieved and used in other api calls.
       * -> Check the response for the next registration step and redirect accordingly
       */

      console.log(data);

      toast.success("Registration Successful; You can now login.");

      localStorage.setItem("S1_d", data);
      setUser({ ...user, id: data?.userId });
      navigate(LOGIN_PAGE_URL);
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.response?.data?.responseMessage);
    }
  });

  const handleRegisterUser = (values: IUserIdentityDetails) => {
    onCreateAdmin.mutate(values);
    console.log(values);
  };

  const togglePassword = (name: keyof PasswordVisibility) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  return (
    <>
      <section className="">
        <div className="h-full max-w-[600px] mx-auto">
          <div className="">
            <Formik
              initialValues={initialSignupValues}
              validationSchema={signupValidationSchema}
              onSubmit={async (values) => {
                handleRegisterUser(values);
              }}>
              {({
                handleBlur,
                handleSubmit,
                handleChange,
                setFieldValue,
                values: {
                  firstName,
                  lastName,
                  middleName,
                  email,
                  gender,
                  phone,
                  password,
                  confirmPassword
                }
              }) => (
                <form onSubmit={handleSubmit}>
                  <div
                    className="mb-10 text-center
                    ">
                    <h2 className="text-[40px] font-semibold text-npv_bold mb-2">
                      Sign up
                    </h2>
                    <p className="font-normal text-[#313131] text-[16px]">
                      Let's get you all st up so you can access your personal
                      account.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-5">
                      <div className="w-[calc(50%-10px)]">
                        <NpvInput
                          fullWidth
                          label="First name"
                          type="text"
                          name="firstName"
                          placeholder="James"
                          value={firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="w-[calc(50%-10px)]">
                        <NpvInput
                          fullWidth
                          label="Last name"
                          type="text"
                          name="lastName"
                          placeholder="Okeniyi"
                          value={lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="w-[calc(50%-10px)]">
                        <NpvInput
                          fullWidth
                          label="Middle name"
                          type="text"
                          name="middleName"
                          placeholder="Kojo"
                          value={middleName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="w-[calc(50%-10px)]">
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
                      </div>

                      <div className="w-[calc(50%-10px)]">
                        <NpvSelect
                          label="Gender"
                          type="text"
                          name="gender"
                          placeholder="Select gender"
                          value={gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          useValue
                          hasObjects
                          selectableObjects={genders}
                        />
                      </div>
                      <div className="w-[calc(50%-10px)]">
                        <NpvInput
                          fullWidth
                          label="Phone number"
                          type="text"
                          name="phone"
                          placeholder="+234-812-3456-789"
                          value={phone}
                          onChange={(e: any) => {
                            const { value } = e.target;
                            const formattedValue = value.replace(/\D/g, "");
                            const newValue = formattedValue.startsWith("234")
                              ? formattedValue
                              : "234" + formattedValue;
                            setFieldValue("phone", newValue);
                            // handleChange();
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    {/* <NpvInput
                        fullWidth
                        label="Email"
                        type="text"
                        name="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      /> */}
                    <NpvInput
                      fullWidth
                      label="Password"
                      type={showPassword.password ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <>
                          {showPassword.password ? (
                            <IconButton
                              onClick={() => togglePassword("password")}>
                              <FaEye className="w-6 h-6 text-app_black" />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => togglePassword("password")}>
                              <FaEyeSlash className="w-6 h-6 text-app_black" />
                            </IconButton>
                          )}
                        </>
                      }
                    />
                    <NpvInput
                      fullWidth
                      label="Confirm password"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <>
                          {showPassword.confirmPassword ? (
                            <IconButton
                              onClick={() => togglePassword("confirmPassword")}>
                              <FaEye className="w-6 h-6 text-app_black" />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => togglePassword("confirmPassword")}>
                              <FaEyeSlash className="w-6 h-6 text-app_black" />
                            </IconButton>
                          )}
                        </>
                      }
                    />
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={terms}
                          onChange={() => setTerms(!terms)}
                        />
                      }
                      label={
                        <p className="text-[14px] font-medium text-[#313131]">
                          I agree to all the{" "}
                          <a
                            href="#"
                            className="font-semibold text-[#FF8682] no-underline">
                            Terms
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="font-semibold text-[#FF8682] no-underline">
                            Privacy Policies
                          </a>{" "}
                        </p>
                      }
                    />
                  </div>

                  <NpvButton
                    isFullWidth
                    type="submit"
                    extraClass="!w-full"
                    isDisabled={onCreateAdmin.isPending || !terms}
                    loading={onCreateAdmin.isPending}>
                    Create your vault
                  </NpvButton>
                  <p className="text-[14px] font-medium text-npv_black text-center mt-4">
                    Have an account already?{" "}
                    <Link
                      className="text-[#FF8682] hover:text-[#FF8682]/75 font-semibold underline"
                      to={LOGIN_PAGE_URL}>
                      Login
                    </Link>
                  </p>

                  {/* <div>
                    <div className="flex items-center gap-5 my-6">
                      <div className="flex-1 w-full h-[0.5px]  bg-npv_grey" />
                      <p className="text-[14px] text-npv_grey">
                        Or sign up with
                      </p>
                      <div className="flex-1 w-full h-[0.5px]  bg-npv_grey" />
                    </div>

                    <div className="text-center w-full">
                      <div className="flex justify-center">
                        <div className="w-fit min-w-[150px] h-full p-5 border-[0.5px] border-npv_grey rounded-[12px] cursor-pointer flex justify-center gap-5">
                          <img src={google} alt="" className="w-[35px]" />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};
