import { Tabs } from "@mui/material";
import { ReactNode } from "react";

export const NpvTabs = ({
  value,
  handleChange,
  label,
  children,
  centered
}: INpvTabs) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label={label}
      centered={centered}
      sx={{
        "& .MuiTabs-flexContainer": {
          borderBottom: "1px solid #E6E6E7"
        },

        "& .MuiTab-root.Mui-selected": {
          color: "#0F0F10"
        },

        "& .MuiTabs-indicator": {
          backgroundColor: "#800080",
          bottom: "unset"
        },

        "& .MuiTab-root": {
          padding: "8px",
          marginRight: "20px",
          color: "#696A71",
          minHeight: "unset",
          textTransform: "none",

          "& .tab_label": {
            display: "inline-flex",
            alignItems: "center",
            gap: "0 8px",
            textTransform: "none",

            "& .icon_holder": {
              borderRadius: "4px",

              "& svg": {
                width: "16px",
                height: "16px",

                "& path": {
                  stroke: "#ED2115"
                }
              }
            }
          }
        }
      }}>
      {children}
    </Tabs>
  );
};

type INpvTabs = {
  value: string | null;
  handleChange: any;
  label: string;
  children: ReactNode;
  centered?: boolean;
};
