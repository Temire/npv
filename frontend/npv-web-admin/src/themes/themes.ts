import { createTheme } from "@mui/material/styles";

const primaryColor = "#800080";

export const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "Cabin", "sans-serif"].join(",")
  },

  palette: {
    primary: {
      main: primaryColor,
      contrastText: "#ffffff"
    },

    secondary: {
      main: "#0F0F10"
    },

    error: {
      light: "#FA7777",
      main: "#F71C1C",
      dark: "#d31717"
    }
  },

  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.25)"
            // backgroundColor: "rgba(255, 83, 73, 0.3)", // Change this color as needed
          }
        }
      }
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            // color: primaryColor,

            "&::-webkit-input-placeholder": {
              fontSize: "0.875rem !important"
            }
          },

          "& .MuiInputBase-adornedStart": {
            "& .MuiInputBase-input": {
              paddingLeft: 0
            }
          },

          "& .radio_label": {
            gap: "0.5rem",
            color: "#4C4D52",

            "& .MuiRadio-root": {
              padding: "0 !important",
              marginLeft: "0 !important",

              "& .MuiSvgIcon-root": {
                fill: "#ADAEB3"
              }
            },

            "& .MuiRadio-root.Mui-checked": {
              "& .MuiSvgIcon-root": {
                fill: primaryColor
              }
            }
          },

          "& .MuiFormHelperText-root": {
            marginLeft: "0"
          }
        }
      }
    }

    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       border: "none"
    //     },
    //     columnHeaders: {
    //       backgroundColor: "#f0f0f0",
    //       borderRadius: "8px 8px 0 0",
    //       "& .MuiDataGrid-columnHeaderTitle": {
    //         fontWeight: "bold"
    //       }
    //     },
    //     cell: {
    //       borderBottom: "none"
    //     },
    //     ".MuiDataGrid-columnHeaderRow": {
    //       backgroundColor: "#f0f0f0",
    //       borderRadius: "8px 8px 0 0"
    //     }
    //   }
    // }

    // MuiFormControlLabel: {
    //   styleOverrides: {
    //     root: {
    //       gap: "0.5rem",

    //       "& .radio_label": {
    //         color: "#4C4D52",
    //       },

    //       "& .MuiRadio-root": {
    //         padding: "0 !important",
    //         marginLeft: "0 !important",
    //       },
    //     },
    //   },
    // },
  }
});
