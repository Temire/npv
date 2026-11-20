import { styled } from "@mui/material";

export const TableBox = styled("div")(({ theme }) => ({
  // height: "77vh",
  width: "100%",

  "& .MuiDataGrid-root": {
    fontSize: "0.95rem",
    backgroundColor: " #FFFFFF",
    border: "none !important",
    boxShadow: "none !important",
  },

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#F5F5F6",
    border: "none",
    borderRadius: "8px",

    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 600,
      color: "#787878",
      textTransform: "capitalize",
      marginRight: ".5rem",
    },
  },

  "& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
    {
      outline: "none",
    },

  "& .status": {
    borderRadius: "4px",
    textAlign: "center",
    fontWeight: 600,
    padding: "0.25rem .5rem",
    fontSize: ".8rem",
  },

  "& .success-status": {
    color: "#17B557",
    backgroundColor: "#D2F9E2",
  },

  "& .pending-status": {
    color: "#4C4D52",
    backgroundColor: "#F5F5F6",
  },

  "& .success-2-status": {
    color: "#058071",
    backgroundColor: "#C7FFF2",
  },

  "& .danger-status": {
    color: "#D90808",
    backgroundColor: "#FDD2D2",
  },

  "& .expired-status": {
    color: "#787878",
    backgroundColor: "#E4E4E4",
  },

  "& .info-status": {
    color: "#001935",
    backgroundColor: "#FAE3A5",
  },

  "& .info-2-status": {
    color: "#0066AB",
    backgroundColor: "#DEF1FF",
  },

  // *******************************

  "& .draft-status": {
    color: "#0F0F10",
    // backgroundColor: "#ffffff",
  },

  "& .ready-status": {
    color: "#0066AB",
    backgroundColor: "#DEF1FF",
  },

  "& .startScheduled-status": {
    color: "#058071",
    backgroundColor: "#C7FFF2",
  },

  "& endScheduled-status": {
    color: "#0066AB",
    backgroundColor: "#DEF1FF",
  },

  "& .fullyScheduled-status": {
    color: "#042D4D",
    backgroundColor: "#B6E4FF",
  },

  "& .rewardEnabled-status": {
    color: "#049147",
    backgroundColor: "#FFE1DF",
  },

  "& .enabled-status": {
    color: "#FF5349",
    backgroundColor: "#D7FFE9",
  },

  "& .disabled-status": {
    color: "#4B0804",
    backgroundColor: "#FFA29D",
  },

  "& .running-status": {
    color: "#049147",
    backgroundColor: "#D7FFE9",
  },

  "& .paused-status": {
    color: "#C8170D",
    backgroundColor: "#FFC8C5",
  },

  "& .discontinued-status": {
    color: "#4C4D52",
    backgroundColor: "#E6E6E7",
  },

  // *******************************

  "& .view-details": {
    color: "1rem",
    fontWeight: 600,
    textDecoration: "underline",
  },

  "& .MuiDataGrid-root .MuiDataGrid-columnHeader": {
    padding: "0 1rem",

    // "&:first-child": {
    //   padding: "0",
    // },
  },

  "& .MuiDataGrid-root .MuiDataGrid-cell": {
    textTransform: "capitalize",
    padding: "0 1rem",
    color: "#424242 !important",
    fontSize: "0.95rem !important",
    fontWeight: "500 !important",
  },

  "& .tableBtn": {
    textTransform: "Capitalize",
    padding: "0.5rem 1rem",
    borderStyle: "solid",
    borderWidth: "1.5px",
    borderColor: theme.palette.primary.main,
    background: "transparent",
    color: theme.palette.primary.main,
  },

  "& .t-lowercase": {
    textTransform: "lowercase",
  },
}));
