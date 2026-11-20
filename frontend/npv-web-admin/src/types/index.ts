import { IconType } from "react-icons/lib";

export interface INavProps {
  name: string;
  path: string;
  icon: IconType;
}

export interface IUploadedFile {
  fileName?: string;
  fileUrl?: string;
  uploadDate?: string;
}

export interface IUser {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  phone?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  idType?: string;
  idNumber?: string;
  idFile?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  proofOfAddress?: string;
  registrationStatus?: string;
  kycStatus?: string;
  role?: string;
  active?: boolean;
  createdDate?: string;
  modifiedDate?: string;
  createdBy?: string;
  modifiedBy?: string;
  kycComplete?: true;
}

export interface IPropertyData {
  id?: number;
  title?: string;
  buyerLastName?: string;
  buyerFirstName?: string;
  buyerAddress?: string;
  sellerLastName?: string;
  sellerFirstName?: string;
  sellerAddress?: string;
  propertyAddress?: string;
  city?: string;
  lgaOrProvince?: string;
  state?: string;
  country?: string;
  closestLandmark?: string;
  uploadedBy?: string;
  uploaderName?: string;
  uploaderAddress?: string;
  relationshipToParties?: string;
  consentLetterUrl: string;
  userId?: number;
  documents: IPropertyDocument[];
  propertyType?: string;
  approvalStatus?: ApprovalStatus;
  rejectionReason?: string;
  mainPropertyImageUrl?: string;
  propertyImageUrl1?: string;
  propertyImageUrl2?: string;
  documentsToResubmit?: string[];
  cost?: string;
  transactionDate?: string;
  propertyTitle?: string;
}
export interface IPropertyDocument {
  documentType?: string;
  documentUrl?: string;
  propertyAssetId?: number;
  id?: number;
  formats?: string;
}

export type ApprovalStatus =
  | "APPROVED"
  | "REJECTED"
  | "PENDING"
  | "RESUBMISSION_REQUESTED"
  | "RESUBMITTED";

export type StatusType = "registration" | "active" | "kyc" | "property";

export type RegistrationStatus =
  | "STEP_1"
  | "STEP_2"
  | "LAST_STEP"
  | "COMPLETED";
export type ActiveStatus = "ACTIVE" | "INACTIVE";
export type KYCStatus = "COMPLETE" | "INCOMPLETE";
export type PropertyStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RESUBMISSION_REQUESTED"
  | "RESUBMITTED";

export type StatusUnion =
  | RegistrationStatus
  | ActiveStatus
  | KYCStatus
  | PropertyStatus;

export interface StatusPillProps {
  type: StatusType;
  status: StatusUnion;
}
export interface ColorScheme {
  bg: string;
  text: string;
}

export type ColorMap = {
  [K in StatusType]: {
    [S in StatusUnion]?: ColorScheme;
  };
};

// export type SubscriptionPlan = {
//   name: string;
//   description: string;
//   amount: number;
//   subscriptionCycle:
//     | "ONE_TIME"
//     | "WEEKLY"
//     | "MONTHLY"
//     | "QUARTERLY"
//     | "HALF_YEARLY"
//     | "YEARLY";
//   subscriptionType: "BASIC" | "GOLD" | "PREMIUM";
// };

export interface SubscriptionPlan {
  name?: string;
  description?: string;
  amount?: number;
  subscriptionCycle?:
    | "ONE_TIME"
    | "WEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "HALF_YEARLY"
    | "YEARLY"
    | null;
  subscriptionType?: "BASIC" | "GOLD" | "PREMIUM" | null;
}
