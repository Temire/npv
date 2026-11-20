export const toBase64 = (file: any) => {
  const reader = new FileReader();
  reader.onload = () => {};
  return reader.readAsDataURL(file);
};

// Function to set HTTP-only cookie
export const setHttpOnlyCookie = (
  name: string | number | boolean,
  value: string | number | boolean,
  expirationDays: number
) => {
  console.log(1);
  const expirationDate = new Date();

  console.log(2);

  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  console.log(3);

  const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; SameSite=Strict; Secure`;

  console.log(4);

  document.cookie = cookieString;

  console.log(5);
};

// export const toSentenceCase = (str: string | null | undefined): string => {
//   if (!str) {
//     return ""; // Return an empty string for null, undefined, or empty input
//   }

//   return str
//     .toLowerCase()
//     .split("_")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

export const toSentenceCase = (str: unknown): string => {
  // Check if str is a non-empty string
  if (typeof str !== "string" || str.length === 0) {
    return ""; // Return an empty string for non-string inputs or empty strings
  }

  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatImageUrl = (url?: string) => {
  if (url) {
    return url
      .replace(":8593", "")
      .replace("https:", "http:")
      .replace("localhost", "http://161.35.9.144");
  }
  return "";
};

export const getStatus = (status?: string) => {
  let status_colors = "";
  switch (status) {
    case "APPROVED":
      status_colors = "text-[#4CAF50] bg-[#E8F5E9]";
      break;
    case "REJECTED":
      status_colors = "text-[#F44336] bg-[#FFEBEE]";
      break;
    case "PENDING":
      status_colors = "text-[#FF9800] bg-[#FFF4E5]";
      break;
    case "RESUBMISSION_REQUESTED":
      status_colors = "text-[#03A9F4] bg-[#E1F5FE]";

      break;
    case "RESUBMITTED":
      status_colors = "text-[#9C27B0] bg-[#F3E5F5]";
      break;
    default:
      break;
  }
  return status_colors;
};
export const formatStatusName = (status?: string) => {
  let status_name = "";
  switch (status) {
    case "APPROVED":
      status_name = "Approved";
      break;
    case "REJECTED":
      status_name = "Rejected";
      break;
    case "PENDING":
      status_name = "Pending";
      break;
    case "RESUBMISSION_REQUESTED":
      status_name = "Resubmission requested";
      break;
    case "RESUBMITTED":
      status_name = "Resubmitted";
      break;
    default:
      break;
  }
  return status_name;
};

export const getPropertyType = (propertyType?: string) => {
  let colors = "";
  switch (propertyType) {
    case "LAND":
      colors = "text-[#2E7D32] bg-[#E8F3E8]";
      break;
    case "BUILDING":
      colors = "text-[#1565C0] bg-[#E3F2FD]";
      break;

    default:
      break;
  }
  return colors;
};

export const getFileExtension = (url?: string) => {
  if (!url) return null;

  const allowedExtensions: string[] = [
    "doc",
    "docx",
    "pdf",
    "jpg",
    "jpeg",
    "png"
  ];

  // Remove any query parameters or hash from the URL
  const cleanUrl: string = url.split(/[?#]/)[0];

  // Get the last part of the URL (after the last '/')
  const fileName: string = cleanUrl.split("/").pop() || "";

  // Get the file extension (everything after the last '.')
  const extension: string = fileName.split(".").pop()?.toLowerCase() || "";

  // Check if the extension is in the allowed list
  if (allowedExtensions.includes(extension)) {
    return extension;
  }

  return null;
};

export const getDocumentTypeName = (documentType?: string) => {
  switch (documentType) {
    case "SURVEY_PLAN":
      return "Survey plan";
      break;
    case "PURCHASE_RECEIPT":
      return "Purchase receipt";
      break;
    case "DEED_OF_ASSIGNMENT":
      return "Deed of assignment";
      break;
    case "CERTIFICATE_OF_OCCUPANCY":
      return "Certificate of occupancy";
      break;
    case "CONTRACT_OF_SALE":
      return "Contract of sale";
      break;
    case "OTHER":
      return "Other";
      break;

    default:
      break;
  }
};

export const getPropertyTitle = (propertyTitle?: string) => {
  switch (propertyTitle) {
    case "CERTIFICATE_OF_OCCUPANCY":
      return "Certificate of Occupancy";
      break;
    case "DEED_OF_ASSIGNMENT":
      return "Deed of assignment";
      break;
    case "REGISTERED_CONVEYANCE":
      return "Registered conveyance";
      break;
    case "DEED_OF_SUBLEASE":
      return "Deed of sublease";
      break;
    case "GOVERNORS_CONSENT":
      return "Governor's consent";
      break;
    case "STATUTORY_RIGHT_OF_OCCUPANCY":
      return "Statutory right of occupancy";
      break;
    case "MORTGAGE_DEED":
      return "Mortgage deed";
      break;
    case "LAND_USE_ACT_TITLE":
      return "Land use act title";
      break;
    default:
      break;
  }
};
