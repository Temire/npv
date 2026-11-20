import { Chip } from "@mui/material";
import {
  CheckBadgeIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowPathIcon
} from "@heroicons/react/16/solid";
import { ApprovalStatus } from "../../../../types";

interface StatusInfo {
  color: string;
  icon: JSX.Element;
  text: string;
}

interface StatusChipProps {
  status: ApprovalStatus;
}

const statusMapping: Record<ApprovalStatus, StatusInfo> = {
  APPROVED: {
    color: "!bg-green-600",
    icon: <CheckBadgeIcon className="w-4" />,
    text: "Approved"
  },
  REJECTED: {
    color: "!bg-red-600",
    icon: <XCircleIcon className="w-4" />,
    text: "Rejected"
  },
  PENDING: {
    color: "!bg-yellow-600",
    icon: <ClockIcon className="w-4" />,
    text: "Pending"
  },
  RESUBMISSION_REQUESTED: {
    color: "!bg-orange-600",
    icon: <ExclamationCircleIcon className="w-4" />,
    text: "Resubmission Requested"
  },
  RESUBMITTED: {
    color: "!bg-blue-600",
    icon: <ArrowPathIcon className="w-4" />,
    text: "Resubmitted"
  }
};

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const statusInfo = statusMapping[status];

  if (!statusInfo) return null;

  return (
    <Chip
      className={`!absolute !top-2 !right-2 !z-10 !duration-500 ${statusInfo.color}`}
      label={
        <div className="flex items-center gap-2 text-white font-semibold">
          {statusInfo.icon}
          <span>{statusInfo.text}</span>
        </div>
      }
    />
  );
};
