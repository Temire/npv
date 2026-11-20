/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import {
  StatusPill,
  NpvTable,
  NpvButton,
  NpvDialog,
  NpvInput,
  NpvSelect
} from "../../../components";
import {
  // FaEye, FaEyeSlash,
  FaPlus
} from "react-icons/fa6";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Alert } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAdmin, getAllAdminUsers } from "../../../services";
import { dialCodes, genders, roles } from "../../../config";
import { AdminActionCell, RolePill } from "./components";

interface IUserIdentityDetails {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  gender?: string;
  dialCode: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

// type PasswordVisibility = {
//   password: boolean;
//   confirmPassword: boolean;
// };

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  // phone: Yup.string().required("Phone number is required"),
  dialCode: Yup.string().required("Dial code is required"),
  phone: Yup.string()
    .matches(
      /^$|234[0-9]{8,16}/,
      "Phone number must be between 8 and 16 digits."
    )
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required")
  // password: Yup.string().required("Password is required"),
  // confirmPassword: Yup.string()
  //   .required("Confirm Password")
  //   .oneOf([Yup.ref("password")], "Password must match")
});

export const RoleManagement = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [openModal, setOpenModal] = React.useState(false);
  // const [showPassword, setShowPassword] = React.useState<PasswordVisibility>({
  //   password: false,
  //   confirmPassword: false
  // });
  const [initialValues] = React.useState<IUserIdentityDetails>({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dialCode: "",
    phone: "",
    email: "",
    password: "Pass1234",
    role: ""
  });

  const {
    data: admin_users,
    isLoading: admin_users_isLoading,
    refetch
  } = useQuery({
    queryKey: ["allAdminUsers"],
    queryFn: () => getAllAdminUsers({ pageSize, pageNumber: pageNumber - 1 })
  });
  const onCreateAdmin = useMutation({
    mutationKey: ["createAdminUser"],
    mutationFn: createAdmin,
    onSuccess(data) {
      console.log(data);
      toast.success("Admin user created.");
      setOpenModal(false);
      refetch();
      setTimeout(() => {
        refetch();
      }, 2000);
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.response?.data?.responseMessage);
    }
  });

  const TableHeader: GridColDef[] = [
    {
      field: "id",
      minWidth: 20,
      headerName: "ID",
      resizable: false
    },
    {
      field: "name",
      headerName: "Admin name",
      minWidth: 250,
      renderCell: (params) => (
        <p className="!normal-case font-semibold">
          {`${params.row?.firstName} ${params.row?.lastName}`}
        </p>
      )
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      renderCell: (params) => (
        <p className="!normal-case font-normal underline">
          {params.row?.email || "-"}
        </p>
      )
    },
    {
      field: "roles",
      headerName: "Role",
      minWidth: 200,
      renderCell: (params) => <RolePill role={params.row?.role} />
    },
    {
      field: "active",
      headerName: " Status",
      resizable: false,
      minWidth: 200,
      renderCell: (params) => (
        <StatusPill
          type="active"
          status={params.row?.active ? "ACTIVE" : "INACTIVE"}
        />
      )
    },
    {
      field: "action",
      headerName: "Action",
      resizable: false,
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <AdminActionCell row={params.row} refetch_admins={refetch} />
      )
    }
  ];

  const handleCreateAdminUser = (values: IUserIdentityDetails) => {
    onCreateAdmin.mutate(values);
    console.log(values);
  };

  // const togglePassword = (name: keyof PasswordVisibility) => {
  //   setShowPassword((prevState) => ({
  //     ...prevState,
  //     [name]: !prevState[name]
  //   }));
  // };

  const handleClose = () => {
    setOpenModal(false);
  };

  const adminUserData = admin_users?.content || [];
  const adminUsersCount = admin_users?.totalElements || 0;

  return (
    <section>
      <div className="flex flex-wrap justify-between gap-6 items-center mb-6 lg:mb-10">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-[30px]">Manage admin roles</p>
          {/* <p className="px-2 py-1 rounded-[4px] font-semibold text-[13px] text-[#1A9882] bg-[#E9FAF7] w-fit ">
            {propertiesCount}+ available
          </p> */}
        </div>
        <NpvButton click={() => setOpenModal(true)}>
          <FaPlus /> Add admin user
        </NpvButton>
      </div>
      <Alert severity="info" className="!mb-8">
        Accounts are created with a default password of "Pass1234". Admin users
        can go ahead to change it after logging in.
      </Alert>
      <div className="border rounded-[8px] p-4">
        <div style={{ height: 650, width: "100%" }}>
          <NpvTable
            height={"650px"}
            columns={TableHeader}
            rows={adminUserData}
            loading={admin_users_isLoading}
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            rowCount={adminUsersCount}
            autoRowHeight={false}
          />
        </div>
      </div>
      {/* Add admin user */}
      <NpvDialog
        size="sm"
        showCloseIcon={false}
        title={`Create admin user`}
        dialogProps={{
          open: openModal,
          onClose: handleClose
        }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values: IUserIdentityDetails) => {
            const fullPhoneNumber = (values?.dialCode + values?.phone).replace(
              "+",
              ""
            );

            fullPhoneNumber.replace("+", "");

            console.log(fullPhoneNumber);

            console.log(values);

            const payload = { ...values, phone: fullPhoneNumber };
            handleCreateAdminUser(payload);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values: {
              firstName,
              lastName,
              email,
              dialCode,
              phone,
              // password,
              // confirmPassword,
              gender,
              role
            }
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="flex flex-col justify-center items-center text-center gap-6 my-10">
                    <NpvInput
                      fullWidth
                      label="First name"
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <NpvInput
                      fullWidth
                      label="Last name"
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <NpvInput
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* <NpvInput
                      fullWidth
                      label="Phone"
                      type="number"
                      name="phone"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    /> */}
                    <div className="w-full flex items-start gap-5">
                      <div className="w-[calc(50%-10px)]">
                        <NpvSelect
                          label="Dial code"
                          type="text"
                          name="dialCode"
                          placeholder="Select option"
                          value={dialCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          useValue
                          hasObjects
                          selectableObjects={dialCodes.map((country) => ({
                            ...country,
                            name: country.flag + " " + country.name,
                            value: country.dial_code
                          }))}
                        />
                      </div>
                      <div className="w-[calc(50%-10px)]">
                        <NpvInput
                          fullWidth
                          label="Phone number"
                          type="text"
                          name="phone"
                          placeholder="812-3456-789"
                          value={phone}
                          onChange={(e: any) => {
                            const { value } = e.target;
                            let formattedValue = value.replace(/\D/g, "");
                            if (formattedValue.startsWith("0")) {
                              formattedValue = formattedValue.substring(1);
                            }
                            setFieldValue("phone", formattedValue);
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
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

                    <NpvSelect
                      label="Role"
                      type="text"
                      name="role"
                      placeholder="Select role"
                      value={role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      useValue
                      hasObjects
                      selectableObjects={roles}
                    />
                    {/* <NpvInput
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
                    /> */}
                  </div>
                </div>
                <div className="mt-6 lg:mt-10 flex items-center gap-4 justify-center">
                  <NpvButton
                    extraClass="!px-8"
                    variant="SecondaryOutline"
                    click={handleClose}>
                    Cancel
                  </NpvButton>
                  <NpvButton
                    extraClass="!px-8"
                    type="submit"
                    isDisabled={onCreateAdmin.isPending}
                    loading={onCreateAdmin.isPending}>
                    Create
                  </NpvButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </NpvDialog>
    </section>
  );
};
