import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { toSentenceCase } from "../../../../utils";

export enum Roles {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN_USER_MGT = "ADMIN_USER_MGT",
  ADMIN_PROPERTY_MGT = "ADMIN_PROPERTY_MGT",
  ADMIN_SUBSCRIPTION_MGT = "ADMIN_SUBSCRIPTION_MGT"
}

type RoleUnion = keyof typeof Roles;

interface RolePillProps {
  role: RoleUnion;
}

const roleColors: Record<RoleUnion, { bg: string; text: string }> = {
  SUPER_ADMIN: { bg: "#D1C4E9", text: "#4A148C" },
  ADMIN_USER_MGT: { bg: "#FFCDD2", text: "#B71C1C" },
  ADMIN_PROPERTY_MGT: { bg: "#C8E6C9", text: "#1B5E20" },
  ADMIN_SUBSCRIPTION_MGT: { bg: "#BBDEFB", text: "#0D47A1" }
};

export const RolePill: React.FC<RolePillProps> = ({ role }) => {
  console.log(role);
  
  const { bg, text } = roleColors["SUPER_ADMIN"];

  const chipProps: ChipProps = {
    label: toSentenceCase(role),
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
