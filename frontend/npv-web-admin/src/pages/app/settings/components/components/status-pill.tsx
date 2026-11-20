import React from "react";
import { Chip } from "@mui/material";

interface StatusPillProps {
  registrationStatus?: "STEP_1" | "STEP_2" | "STEP_3" | "COMPLETED" | null;
}

interface StatusMap {
  [key: string]: {
    label: string;
    textColor: string;
    bgColor: string;
  };
}

const statusMap: StatusMap = {
  STEP_1: {
    label: "Step 1",
    textColor: "!text-blue-600",
    bgColor: "!bg-blue-100"
  },
  STEP_2: {
    label: "Step 2",
    textColor: "!text-yellow-600",
    bgColor: "!bg-yellow-100"
  },
  STEP_3: {
    label: "Step 3",
    textColor: "!text-orange-600",
    bgColor: "!bg-orange-100"
  },
  COMPLETED: {
    label: "Completed",
    textColor: "!text-green-600",
    bgColor: "!bg-green-100"
  }
};

export const StatusPill: React.FC<StatusPillProps> = ({
  registrationStatus
}) => {
  if (!registrationStatus || !statusMap[registrationStatus]) {
    return null;
  }

  const { label, textColor, bgColor } = statusMap[registrationStatus];

  return (
    <Chip
      label={label}
      className={`${textColor} ${bgColor} !font-semibold !rounded-full !py-1 !px-2`}
    />
  );
};
