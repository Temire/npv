// import React from "react";

import {
  Button,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses
} from "@mui/material";
import {
  FaArrowLeftLong,
  FaCircleExclamation,
  FaFile,
  FaFilePdf,
  FaImage
} from "react-icons/fa6";
import {
  NpvButton,
  NpvDialog,
  NpvInput,
  SidebarSkeletonLoader,
  SkeletonLoader
} from "../../../../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../../context";
import {
  getSingleProperty,
  getPropertyDocuments,
  propertyApproval
} from "../../../../services";
import {
  formatImageUrl,
  formatStatusName,
  getDocumentTypeName,
  getFileExtension,
  getPropertyType,
  getStatus,
  getPropertyTitle
} from "../../../../utils";
import { BiSolidFilePng, BiSolidFileJpg } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import { documentTypes } from "../../../../config/data";
import { NAIRA } from "../../../../config";

type FileExtension =
  | "pdf"
  | "png"
  | "jpg"
  | "jpeg"
  | "doc"
  | "docx"
  | "default";

type ApproveModalTypes = "approve" | "reject" | "review" | null;

interface FileIconProps {
  extension: string | null;
}

const validationSchema = Yup.object().shape({
  rejectionReason: Yup.string().required("Rejection reason is required")
});
const fileTypeColors: Record<FileExtension, string> = {
  pdf: "#F40F02",
  png: "#800080BB",
  jpg: "#4CAF50",
  jpeg: "#4CAF50",
  doc: "#2B579A",
  docx: "#2B579A",
  default: "#757575"
};

const FileIcon: React.FC<FileIconProps> = ({ extension }) => {
  const color =
    fileTypeColors[extension as FileExtension] || fileTypeColors.default;
  let Icon: IconType;

  switch (extension) {
    case "pdf":
      Icon = FaFilePdf;
      break;
    case "png":
      Icon = BiSolidFilePng;
      break;
    case "jpg":
      Icon = BiSolidFileJpg;
      break;
    case "jpeg":
      Icon = BiSolidFileJpg;
      break;
    //   case "doc":
    //   case "docx":
    //     Icon = FaFileWord;
    //     break;
    default:
      Icon = FaFile;
  }

  return <Icon color={color} size={28} />;
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    borderRadius: "12px"
  },
  [`& .${toggleButtonGroupClasses.selected}`]: {
    background: "#800080",
    color: "#ffffff"
  }
  //   [`& .${toggleButtonGroupClasses.selected}:hover`]: {
  //     background: "#800080",
  //     opacity: 0.75,
  //     color: "#ffffff"
  //   }
}));

export const ManageProperty = () => {
  const { propertyId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [openApproveModal, setOpenApproveModal] =
    React.useState<ApproveModalTypes>(null);
  const [initialValues] = React.useState({
    rejectionReason: "",
    propertyDocuments: []
  });

  const {
    data: property_data,
    isLoading: property_isLoading,
    refetch: refetch_property
  } = useQuery({
    queryKey: ["GetSingleProperty"],
    queryFn: () =>
      getSingleProperty({
        propertyId: propertyId
      }),
    enabled: !!propertyId
  });

  const {
    data: documents_data,
    isLoading: documents_isLoading,
    refetch: refetch_documents
  } = useQuery({
    queryKey: ["GetPropertyDocuments"],
    queryFn: () =>
      getPropertyDocuments({
        propertyId: propertyId
      }),
    enabled: !!propertyId
  });

  const onApproveProperty = useMutation({
    mutationKey: ["propertyApproval"],
    mutationFn: propertyApproval,
    onSuccess() {
      setOpenApproveModal(null);
      toast.success("Property status updated successfully.");
      refetch_property();
      refetch_documents();
      setTimeout(() => {
        refetch_property();
        refetch_documents();
      }, 2000);
    },
    onError(error) {
      console.log(error);
      toast.error("Failed to update property status. Please try again later.");
    }
  });

  const handlePropertyApproval = (values: any) => {
    console.log(values);
    onApproveProperty.mutate(values);
  };

  const goBack = () => {
    navigate(-1);
  };

  const openDocument = (
    event: React.MouseEvent<HTMLButtonElement>,
    url?: string
  ) => {
    event.preventDefault();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const propertyData = property_data && property_data;
  const documentsData = (documents_data && documents_data) || [];

  return (
    <section>
      {/* Split View */}
      <div className="flex items-center gap-6 flex-wrap justify-between !mb-6">
        <div className="flex items-center gap-3">
          <Button
            onClick={goBack}
            variant="text"
            className="!flex !items-center !gap-3 !normal-case !font-semibold !text-black">
            <FaArrowLeftLong />
            Go back
          </Button>
          <p className="text-[18px] font-semibold">Property Id:</p>
          <p className="px-2 py-1 rounded-[8px] font-semibold text-[15px] text-[#1A9882] bg-[#E9FAF7] w-fit ">
            {propertyId}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setOpenApproveModal("approve")}
            variant="text"
            className="!normal-case !font-semibold !text-green-600 !bg-green-100 !text-base !px-10 !py-3 !rounded-[8px]">
            Approve
          </Button>
          <Button
            onClick={() => setOpenApproveModal("reject")}
            variant="text"
            className="!normal-case !font-semibold !text-red-600 !bg-red-100 !text-base !px-10 !py-3 !rounded-[8px]">
            Reject
          </Button>
          <Button
            onClick={() => setOpenApproveModal("review")}
            variant="text"
            className="!normal-case !font-semibold !text-amber-600 !bg-amber-100 !text-base !px-10 !py-3 !rounded-[8px]">
            Send back for review
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-start">
        <div className="w-full lg:w-[calc(70%-12px)]">
          {property_isLoading || documents_isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {/* Image View */}
              <div className="flex flex-wrap gap-6 items-stretch mb-10">
                <div className="w-full border border-gray-300 bg-gray-50 h-[200px] lg:h-[400px] border-dashed lg:w-[calc(50%-12px)] rounded-[8px]">
                  {propertyData?.mainPropertyImageUrl ? (
                    <img
                      src={formatImageUrl(propertyData?.mainPropertyImageUrl)}
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <FaImage className="text-[24px] text-gray-500" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-5 w-full h-[400px] lg:w-[calc(50%-12px)]">
                  <div className="w-full border border-gray-300 bg-gray-50 h-[calc(50%-10px)] border-dashed rounded-[8px]">
                    {propertyData?.propertyImageUrl1 ? (
                      <img
                        src={formatImageUrl(propertyData?.propertyImageUrl1)}
                        className="w-full h-full object-cover rounded-[8px]"
                      />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center">
                        <FaImage className="text-[24px] text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="w-full border border-gray-300 bg-gray-50 h-[calc(50%-10px)] border-dashed rounded-[8px]">
                    {propertyData?.propertyImageUrl2 ? (
                      <img
                        src={formatImageUrl(propertyData?.propertyImageUrl2)}
                        className="w-full h-full object-cover rounded-[8px]"
                      />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center">
                        <FaImage className="text-[24px] text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details View */}
              <div className="border p-4 rounded-[8px]">
                <div className="mb-10">
                  <h2 className="mb-5 text-[24px] font-bold">
                    Property details
                  </h2>

                  <div className="mb-4">
                    <p className="text-[15px] font-semibold">Property name</p>
                    <h2 className="text-[21px] font-bold">
                      {propertyData?.title}
                    </h2>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">Property title</p>
                    <p className="font-bold">
                      {getPropertyTitle(propertyData?.propertyTitle)}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">Property cost</p>
                    <p className="font-bold">
                      {`${NAIRA} ${parseInt(propertyData?.cost).toLocaleString()}`}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">Buyer's name</p>
                    <p className="">{`${propertyData?.buyerFirstName} ${propertyData?.buyerLastName}`}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">Buyer's address</p>
                    <p className="line-clamp-5 max-w-[600px]">
                      {propertyData?.buyerAddress ?? "-"}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">Seller's name</p>
                    <p className="">{`${propertyData?.sellerFirstName} ${propertyData?.sellerLastName}`}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">
                      Seller's address
                    </p>
                    <p className="line-clamp-5 max-w-[600px]">
                      {propertyData?.sellerAddress ?? "-"}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">
                      Property address
                    </p>
                    <p className="line-clamp-5 max-w-[600px]">
                      {propertyData?.propertyAddress ?? "-"}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">
                      Property uploaded by:
                    </p>
                    <div className="flex gap-2">
                      <p className="line-clamp-1 text-[16px]">
                        {propertyData?.uploadedBy}
                      </p>
                      {user?.fullName == propertyData?.uploaderName && (
                        <div className="bg-[#E0F2F1] text-[#00796B] text-[12px] font-bold px-3 py-1 rounded-full">
                          Me
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">Uploader name:</p>
                    <div className="flex gap-2">
                      <p className="line-clamp-1 text-[16px]">
                        {propertyData?.uploaderName}
                      </p>
                      {user?.fullName == propertyData?.uploaderName && (
                        <div className="bg-[#E0F2F1] text-[#00796B] text-[12px] font-bold px-3 py-1 rounded-full">
                          Me
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold">
                      Relationship to parties
                    </p>
                    <div className="flex flex-wrap gap-2 justify-between items-center">
                      <p className="line-clamp-1 text-[16px]">
                        {propertyData?.relationshipToParties}
                      </p>
                      {propertyData?.consentLetterUrl && (
                        <Button
                          onClick={(e) => {
                            openDocument(
                              e,
                              formatImageUrl(propertyData?.consentLetterUrl)
                            );
                          }}
                          variant="outlined"
                          className="!normal-case !font-medium !text-[14px] !rounded-full">
                          Open consent letter
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[15px] font-semibold mb-2">
                      Property type
                    </p>
                    {propertyData?.propertyType ? (
                      <div
                        className={`${getPropertyType(propertyData?.propertyType)} font-semibold px-6 py-2 rounded-full w-fit bg-[#E8F3E8] text-[#2E7D32]`}>
                        {propertyData?.propertyType == "LAND"
                          ? "Land"
                          : propertyData?.propertyType == "BUILDING"
                            ? "Building"
                            : "-"}
                      </div>
                    ) : (
                      "Not provided"
                    )}
                  </div>
                  <div className="mb-6">
                    <p className="text-[15px] font-semibold mb-2">
                      Closest landmark
                    </p>
                    {propertyData?.closestLandmark ? (
                      <div
                        className={`font-semibold px-6 py-2 rounded-full w-fit bg-[#FFF3E0] text-[#E65100]`}>
                        {propertyData?.closestLandmark}
                      </div>
                    ) : (
                      "Not provided"
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full lg:w-[calc(30%-12px)]">
          {property_isLoading || documents_isLoading ? (
            <SidebarSkeletonLoader />
          ) : (
            <>
              <div className="border p-4 rounded-[8px] flex flex-col gap-8 mb-6">
                <div className="">
                  <p className="text-[18px] font-semibold mb-2">
                    Approval status
                  </p>
                  <div
                    className={`${getStatus(propertyData?.approvalStatus)} font-semibold px-6 py-2 rounded-full w-fit`}>
                    {formatStatusName(propertyData?.approvalStatus)}
                  </div>
                </div>
                {propertyData?.rejectionReason && (
                  <div className="">
                    <p className="text-[15px] font-semibold">
                      Rejection reason
                    </p>
                    <p className="line-clamp-5">
                      {propertyData?.rejectionReason}
                    </p>
                  </div>
                )}
                {propertyData?.documentsToResubmit && (
                  <div className="">
                    <p className="text-[15px] font-semibold mb-2">
                      Documents to resubmit
                    </p>
                    <div className="flex flex-col gap-2">
                      {propertyData?.documentsToResubmit?.map(
                        (document: string) => (
                          <div className="flex gap-3 items-center">
                            <div className="bg-slate-500 w-3 h-3 rounded-full" />
                            <p>{getDocumentTypeName(document)}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="border p-4 rounded-[8px] flex flex-col gap-8">
                <div>
                  <h2 className="mb-5 text-[24px] font-bold">
                    Available documents
                  </h2>

                  <div className="flex flex-col gap-4">
                    {documentsData &&
                      documentsData.length > 0 &&
                      documentsData?.map((document: any, idx: number) => (
                        <div
                          className="w-full max-w-[600px] border border-solid border-[#8000803D] rounded-[8px] shadow-[2px_2px_4px_0px_#80008026] bg-white p-4 flex items-center gap-4"
                          key={idx}>
                          <div>
                            <FileIcon
                              extension={getFileExtension(
                                document?.document.documentUrl
                              )}
                            />
                          </div>
                          <div>
                            <p className="text-[#666666] text-base font-semibold">
                              {getDocumentTypeName(
                                document?.document.documentType
                              )}
                            </p>
                            <Button
                              variant="text"
                              onClick={(e) => {
                                openDocument(
                                  e,
                                  formatImageUrl(document?.document.documentUrl)
                                );
                              }}
                              className="!font-semibold !text-[12px] !normal-case !p-0 hover:!underline">
                              View document
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <NpvDialog
        size="sm"
        showCloseIcon={false}
        title={`Approve Document`}
        dialogProps={{
          open: openApproveModal === "approve",
          onClose: () => setOpenApproveModal(null)
        }}>
        <div>
          <div className="flex flex-col justify-center items-center text-center gap-6 my-10">
            <FaCircleExclamation className="text-green-400 text-[48px] lg:text-[80px]" />
            <p>
              You are about to approve this property. Please ensure that all
              documents have been thoroughly verified. Are you certain you wish
              to proceed?
            </p>
          </div>
        </div>
        <div className="mt-6 lg:mt-10 flex items-center gap-4 justify-center">
          <NpvButton
            extraClass="!px-8"
            variant="SecondaryOutline"
            click={() => {
              setOpenApproveModal(null);
            }}>
            Cancel
          </NpvButton>
          <NpvButton
            extraClass="!px-8 !bg-green-600 !border-green-600"
            isDisabled={onApproveProperty.isPending}
            loading={onApproveProperty.isPending}
            click={() => {
              const payload = {
                status: "APPROVED",
                propertyId: propertyId,
                propertyDocuments: [],
                rejectionReason: ""
              };
              handlePropertyApproval(payload);
            }}>
            Approve
          </NpvButton>
        </div>
      </NpvDialog>

      {/* Reject */}
      <NpvDialog
        size="sm"
        showCloseIcon={false}
        title={`Reject Document`}
        dialogProps={{
          open: openApproveModal === "reject",
          onClose: () => setOpenApproveModal(null)
        }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values: any) => {
            console.log(values);
            const payload = {
              status: "REJECTED",
              propertyId: propertyId,
              propertyDocuments: values.propertyDocuments,
              rejectionReason: values.rejectionReason
            };
            handlePropertyApproval(payload);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values: { rejectionReason }
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="flex flex-col justify-center items-center text-center gap-6 my-10">
                    <FaCircleExclamation className="text-red-400 text-[48px] lg:text-[80px]" />
                    <p>
                      You are about to reject this property. Are you certain you
                      wish to proceed?
                    </p>
                    <NpvInput
                      fullWidth
                      isMultiline
                      mRow={4}
                      label="Rejection reason"
                      type="text"
                      name="rejectionReason"
                      placeholder="Enter rejection reason"
                      value={rejectionReason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mt-6 lg:mt-10 flex items-center gap-4 justify-center">
                  <NpvButton
                    extraClass="!px-8"
                    variant="SecondaryOutline"
                    click={() => {
                      setOpenApproveModal(null);
                    }}>
                    Cancel
                  </NpvButton>
                  <NpvButton
                    type="submit"
                    extraClass="!px-8 !bg-red-600 !border-red-600"
                    isDisabled={onApproveProperty.isPending}
                    loading={onApproveProperty.isPending}>
                    Reject
                  </NpvButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </NpvDialog>

      {/* Review */}
      <NpvDialog
        size="sm"
        showCloseIcon={false}
        title={`Review Property`}
        dialogProps={{
          open: openApproveModal === "review",
          onClose: () => setOpenApproveModal(null)
        }}>
        <Formik
          initialValues={initialValues}
          validationSchema={null}
          enableReinitialize
          onSubmit={async (values: any) => {
            console.log(values);
            const payload = {
              status: "RESUBMISSION_REQUESTED",
              propertyId: propertyId,
              propertyDocuments: values.propertyDocuments,
              rejectionReason: ""
            };
            handlePropertyApproval(payload);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values: { propertyDocuments, rejectionReason }
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="flex flex-col justify-center items-center text-center gap-6 my-10">
                    <FaCircleExclamation className="text-amber-400 text-[48px] lg:text-[80px]" />
                    <p>
                      You are about to send this property back for review. Are
                      you certain you wish to proceed?
                    </p>
                    <div className="w-full">
                      <NpvInput
                        fullWidth
                        isMultiline
                        mRow={4}
                        label="Reason for resubmission"
                        type="text"
                        name="rejectionReason"
                        placeholder="Enter reason for resubmission"
                        value={rejectionReason}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <StyledToggleButtonGroup
                      size="small"
                      value={propertyDocuments}
                      onChange={(
                        _event: React.MouseEvent<HTMLElement>,
                        newDocuments: string
                      ) => setFieldValue("propertyDocuments", newDocuments)}
                      aria-label="text formatting"
                      className="!flex-wrap">
                      {documentTypes.map((documentType, idx: number) => (
                        <ToggleButton
                          value={documentType.value}
                          aria-label="bold"
                          key={idx}
                          className="!normal-case !font-semibold !border !border-npv_purple !rounded-[8px] !px-6 hover:!border">
                          {documentType.name}
                        </ToggleButton>
                      ))}
                    </StyledToggleButtonGroup>
                  </div>
                </div>
                <div className="mt-6 lg:mt-10 flex items-center gap-4 justify-center">
                  <NpvButton
                    extraClass="!px-8"
                    variant="SecondaryOutline"
                    click={() => {
                      setOpenApproveModal(null);
                    }}>
                    Cancel
                  </NpvButton>
                  <NpvButton
                    type="submit"
                    extraClass="!px-8 !bg-amber-600 !border-amber-600"
                    isDisabled={onApproveProperty.isPending}
                    loading={onApproveProperty.isPending}>
                    Review
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
