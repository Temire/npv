import { Avatar } from "@mui/material";
import { Formik } from "formik";
import * as React from "react";
import { NpvInput } from "../../../../components";
import * as Yup from "yup";
import { useUser } from "../../../../context";
import { useQuery } from "@tanstack/react-query";
import { getUserByEmail } from "../../../../services";
import { dialCodes } from "../../../../config";
// import { User } from "../../../../types";
// import { StatusPill } from "./components/status-pill";
import { IUser } from "../../../../types";
// import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Phone number is required"),
  addressLine1: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required")
});

export const Profile = () => {
  const { user } = useUser();

  const [initialValues, setInitialValues] = React.useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const { data: user_data } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () =>
      getUserByEmail({
        userEmail: user?.email
      }),
    enabled: !!user?.email,
    retry: 2
  });

  React.useEffect(() => {
    if (user_data) {
      setInitialValues({
        ...initialValues,
        firstName: user_data?.firstName,
        lastName: user_data?.lastName,
        email: user_data?.email,
        phone: user_data?.phone,
        addressLine1: user_data?.addressLine1,
        addressLine2: user_data?.addressLine2,
        city: user_data?.city,
        state: user_data?.state,
        country: dialCodes.find((country) => country.name == user_data?.country)
          ?.code,
        registrationStatus: user_data?.registrationStatus
      });
    }
  }, [user_data]);

  // const handleUpdateUser = (values: User) => {
  //   const countryName = npvCountries.getCountryByShort(values.country).name;
  //   const payload = { ...values, country: countryName, userId: user?.id };
  //   console.log(payload);
  //   onUpdateUserDetails.mutate(payload);
  // };

  return (
    <div className="w-full max-w-[811px]">
      <div className="pb-3 mb-5">
        <p className="text-[20px] font-semibold text-black">User information</p>
      </div>

      <div className="my-6 mb-12 flex items-center gap-4">
        <div className="relative">
          <Avatar
            sx={{ width: "88px", height: "88px" }}
            className="!border !cursor-pointer"
          />
          <div className="absolute"></div>
        </div>
        <div>
          <p className="text-[16px] font-semibold mb-2">{user?.fullName}</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold text-[13px]">Role:</p>
          </div>
        </div>
      </div>

      <div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
            // handleUpdateUser(values);
          }}>
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            values: { firstName, lastName, email, phone }
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-10 flex flex-wrap gap-5">
                <div className="w-full lg:w-[calc(50%-10px)]">
                  <NpvInput
                    fullWidth
                    label="First name"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                  />
                </div>
                <div className="w-full lg:w-[calc(50%-10px)]">
                  <NpvInput
                    fullWidth
                    label="Last name"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                  />
                </div>

                <div className="w-full lg:w-[calc(50%-10px)]">
                  <NpvInput
                    fullWidth
                    label="Email"
                    type="text"
                    name="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                  />
                </div>
                <div className="w-full lg:w-[calc(50%-10px)]">
                  <NpvInput
                    fullWidth
                    label="Phone number"
                    type="number"
                    name="phone"
                    placeholder="+(123)-45-6789-012"
                    value={phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {/* <NpvButton
                isDisabled={onUpdateUserDetails.isPending}
                loading={onUpdateUserDetails.isPending}
                type="submit">
                Save changes
              </NpvButton> */}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
