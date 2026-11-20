import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { toSentenceCase } from "../../utils";
import {
  StatusPillProps,
  StatusType,
  StatusUnion,
  ColorScheme,
  ColorMap
} from "../../types";

export const StatusPill: React.FC<StatusPillProps> = ({ type, status }) => {
  const getColor = (type: StatusType, status: StatusUnion): ColorScheme => {
    const colors: ColorMap = {
      registration: {
        STEP_1: { bg: "#FFF4E5", text: "#FF9800" },
        STEP_2: { bg: "#E8F5E9", text: "#4CAF50" },
        LAST_STEP: { bg: "#E3F2FD", text: "#2196F3" },
        COMPLETED: { bg: "#E8F5E9", text: "#4CAF50" }
      },
      active: {
        ACTIVE: { bg: "#E8F5E9", text: "#4CAF50" },
        INACTIVE: { bg: "#FFEBEE", text: "#F44336" }
      },
      kyc: {
        COMPLETE: { bg: "#E8F5E9", text: "#4CAF50" },
        INCOMPLETE: { bg: "#FFEBEE", text: "#F44336" }
      },
      property: {
        PENDING: { bg: "#FEF9C3", text: "#854D0E" },
        APPROVED: { bg: "#DCFCE7", text: "#166534" },
        REJECTED: { bg: "#FEE2E2", text: "#FF1100" },
        RESUBMISSION_REQUESTED: { bg: "#FFFBEB", text: "#B45309" },
        RESUBMITTED: { bg: "#E0F2FE", text: "#0369A1" }
      }
    };

    return colors[type][status] || { bg: "#E0E0E0", text: "#757575" };
  };

  const { bg, text } = getColor(type, status);

  const chipProps: ChipProps = {
    label: toSentenceCase(status),
    sx: {
      backgroundColor: bg,
      color: text,
      fontWeight: "bold",
      borderRadius: "16px",
      "& .MuiChip-label": {
        padding: "0 12px"
      }
    }
  };

  return <Chip {...chipProps} />;
};
