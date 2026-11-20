import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserById,
  getUserProperties,
  manageUser
} from "../../../../services";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination
} from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import { BsExclamation } from "react-icons/bs";
import { AssetCard, EmptyState, StatusPill } from "../../../../components";
import {
  IPropertyData,
  KYCStatus,
  RegistrationStatus
} from "../../../../types";

interface UserDetails {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  profilePicture: string | null;
  idType: string;
  idNumber: string;
  idFile: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  proofOfAddress: string | null;
  registrationStatus: string;
  kycStatus: string;
  role: string;
  active: boolean;
  createdDate: string | null;
  modifiedDate: string;
  createdBy: string | null;
  modifiedBy: string | null;
}

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:p-6 md:border rounded-lg">
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <h2 className="text-2xl font-bold text-white">User Details</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-4/5 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4">
        <h2 className="text-2xl font-bold text-white">KYC Details</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-4/5 animate-pulse"></div>
      </div>
    </div>
  </div>
);
const SkeletonUserInfo = () => (
  <div className="flex flex-col lg:flex-row gap-2 lg:items-center flex-wrap">
    <div className="flex gap-2 items-center">
      <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
      <div className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
      <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
    </div>
  </div>
);

const UserDetailItem = ({
  label,
  value,
  registrationStatus,
  kycStatus,
  link
}: any) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <span className="text-gray-500 font-medium">{label}</span>
      {registrationStatus ? (
        <StatusPill
          type="registration"
          status={value ? (value as RegistrationStatus) : "INCOMPLETE"}
        />
      ) : kycStatus ? (
        <StatusPill
          type="kyc"
          status={value ? (value as KYCStatus) : "INCOMPLETE"}
        />
      ) : link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 sm:mt-0 text-npv_purple hover:text-npv_purple/80 transition-colors duration-200 font-semibold">
          {value}
        </a>
      ) : (
        <span className="mt-1 sm:mt-0 text-gray-900">{value}</span>
      )}
    </div>
  );
};

export const ManageUser: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [pageSize] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(0);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    data: user_data,
    refetch,
    isLoading: isLoadingUser
  } = useQuery({
    queryKey: ["getUserById"],
    queryFn: () =>
      getUserById({
        userId: userId
      }),
    enabled: !!userId
  });

  const {
    data: user_properties,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ["getUserProperties"],
    queryFn: () =>
      getUserProperties({
        userId: userId,
        pageSize,
        pageNumber
      }),
    enabled: !!userId
  });

  React.useEffect(() => {
    refetch();
  }, [pageNumber]);

  const onManageUser = useMutation({
    mutationKey: ["manageUser"],
    mutationFn: manageUser,
    onSuccess() {
      toast.success("User status updated successfully");
      refetch();
      setTimeout(() => {
        refetch();
      }, 1000);
    },
    onError(error) {
      console.log(error);
      toast.success("Failed to update user status. Please try again later.");
    }
  });

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value - 1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    handleCloseModal();
    onManageUser.mutate({ userId: user.id, activeStatus: !user.active });
  };

  const goBack = () => {
    navigate(-1);
  };

  const user: UserDetails = user_data && user_data;
  // const userProperties: IPropertyData[] =
  //   (user_properties && user_properties?.content) || [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-6">
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center flex-wrap">
          <Button
            onClick={goBack}
            variant="text"
            className="!flex !items-center !gap-3 !normal-case !font-semibold !text-black !w-fit">
            <FaArrowLeftLong />
            Go back
          </Button>
          {isLoadingUser ? (
            <SkeletonUserInfo />
          ) : (
            <div className="flex gap-2 items-center">
              <p className="text-gray-500 font-medium">User:</p>
              <h1 className="text-xl font-bold">
                {user?.firstName} {user?.middleName} {user?.lastName}
              </h1>
              <StatusPill
                type="active"
                status={user?.active ? "ACTIVE" : "INACTIVE"}
              />
            </div>
          )}
        </div>

        {!isLoadingUser && (
          <div>
            {user?.active ? (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="!bg-red-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !normal-case">
                Deactivate User
              </Button>
            ) : (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="!bg-green-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !normal-case">
                Activate User
              </Button>
            )}
          </div>
        )}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.firstName} {user.middleName}{" "}
              {user.lastName}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.addressLine1}, {user.addressLine2}
              , {user.city}, {user.state}, {user.country}, {user.postalCode}
            </p>
            <p>
              <strong>Registration Status:</strong> {user.registrationStatus}
            </p>
          </div>
        </div>

      
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">KYC Details</h2>
          <div className="space-y-2">
            <p>
              <strong>ID Type:</strong> {user.idType}
            </p>
            <p>
              <strong>ID Number:</strong> {user.idNumber}
            </p>
            <p>
              <strong>KYC Status:</strong> {user.kycStatus}
            </p>
            {user.idFile && (
              <p>
                <strong>ID File:</strong>{" "}
                <a
                  href={user.idFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">
                  View ID
                </a>
              </p>
            )}
            {user.proofOfAddress && (
              <p>
                <strong>Proof of Address:</strong>{" "}
                <a
                  href={user.proofOfAddress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">
                  View Document
                </a>
              </p>
            )}
          </div>
        </div>
      </div> */}
      {isLoadingUser ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:p-6 md:border rounded-lg">
          {/* User Details Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
              <h2 className="text-2xl font-bold text-white">User Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <UserDetailItem
                label="Name"
                value={`${user?.firstName} ${user?.middleName} ${user?.lastName}`}
              />
              <UserDetailItem label="Gender" value={user?.gender} />
              <UserDetailItem label="Email" value={user?.email} />
              <UserDetailItem label="Phone" value={user?.phone} />

              <UserDetailItem
                label="Address"
                value={
                  user?.addressLine1
                    ? `${user?.addressLine1}, ${user?.addressLine2}, ${user?.city}, ${user?.state}, ${user?.country}`
                    : "Not provided"
                }
              />
              <UserDetailItem
                label="Registration Status"
                value={user?.registrationStatus}
                registrationStatus={true}
              />
            </div>
          </div>

          {/* KYC Details Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4">
              <h2 className="text-2xl font-bold text-white">KYC Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <UserDetailItem label="ID Type" value={user?.idType || "-"} />
              <UserDetailItem label="ID Number" value={user?.idNumber || "-"} />
              <UserDetailItem
                label="KYC Status"
                value={user?.kycStatus}
                kycStatus={true}
              />
              {user?.idFile && (
                <UserDetailItem
                  label="ID File"
                  value="View ID"
                  link={user?.idFile}
                />
              )}
              {user?.proofOfAddress && (
                <UserDetailItem
                  label="Proof of Address"
                  value="View Document"
                  link={user?.proofOfAddress}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-6 border rounded-lg my-8">
        <h2 className="text-[20px] lg:text-[24px] font-semibold mb-4">
          User properties
        </h2>

        <>
          {isLoading && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 lg:gap-8">
                {[...Array(12)].map(() => (
                  <div className="w-full">
                    <div className="w-full animate-pulse">
                      <div className="flex flex-col gap-1">
                        <div className="border border-none rounded-[12px] h-[180px] bg-gray-200"></div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {isSuccess && !isLoading && user_properties.empty ? (
            <EmptyState text={"This user has not uploaded any property yet"} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 lg:gap-8">
                {user_properties?.content.map(
                  (content: IPropertyData, idx: number) => (
                    <div className="w-full" key={idx}>
                      <AssetCard asset={content} />
                    </div>
                  )
                )}
              </div>
              <div className="mt-20 w-full">
                <Pagination
                  count={user_properties?.totalPages}
                  page={pageNumber + 1}
                  onChange={handleChange}
                  color="primary"
                />
              </div>
            </>
          )}
        </>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        classes={{
          paper: "rounded-lg shadow-xl"
        }}>
        <DialogTitle className="!bg-npv_purple !text-white !px-6 !py-4">
          <h3 className="text-lg font-semibold">
            Confirm {user?.active ? "Deactivation" : "Activation"}
          </h3>
        </DialogTitle>
        <DialogContent className="!px-6 !py-4">
          <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-md mb-4">
            <BsExclamation className="mr-2" />
            <p className="text-sm">
              This action will {user?.active ? "restrict" : "grant"} user access
              to the system.
            </p>
          </div>
          <p className="text-gray-700">
            Are you sure you want to {user?.active ? "deactivate" : "activate"}{" "}
            the user{" "}
            <span className="font-semibold">
              {user?.firstName + " " + user?.lastName || user.email}
            </span>
            ?
          </p>
        </DialogContent>
        <DialogActions className="!px-6 !py-4 !border-t !border-gray-200">
          <Button
            onClick={handleCloseModal}
            className="!px-4 !py-2 !text-gray-600 !hover:bg-gray-100 !rounded !font-semibold !normal-case">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className={`!px-4 !py-2 !text-white !rounded !font-semibold !normal-case ${
              user?.active
                ? "!bg-red-600 hover:!bg-red-700"
                : "!bg-green-600 hover:!bg-green-700"
            }`}>
            {user?.active ? "Deactivate" : "Activate"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
