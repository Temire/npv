import { FormControl, styled } from "@mui/material";

export const InputBox = styled(FormControl)(({ theme }) => ({
  margin: "0.5rem 0",
  fontFamily: "Poppins",

  "& .MuiOutlinedInput-root": {
    borderRadius: "8px"
  },

  "& .input": {
    "& .MuiOutlinedInput-input": {
      padding: "0.8rem 1rem",

      "&::-webkit-input-placeholder": {
        fontSize: "0.875rem !important"
      }
    },

    "& .MuiInputBase-inputMultiline.MuiOutlinedInput-inputMultiline": {
      padding: "0.5rem"
    },

    "& .MuiInputLabel-outlined": {
      fontSize: "0.865rem",
      color: theme.palette.secondary.main,
      fontWeight: 600,
      backgroundColor: "#ffffff",
      padding: "0.25rem 0.5rem"
    },

    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.text,
      padding: "0.25rem 0.5rem"
    },

    "& .Mui-focused": {
      borderColor: "#E6E6E7 !important"
    },

    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(121, 121, 121, 0.87)",
      borderWidth: 1
    },

    "& .PrivateNotchedOutline-root-253.MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(121, 121, 121, 0.87)",
      borderWidth: 1
    },

    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
      borderColor: "#f44336"
    },

    "& textarea": {
      padding: "0 !important"
    }
  },
  "& .feedback": {
    color: "crimson",
    paddingBottom: theme.spacing(1),
    fontWeight: 500,

    "& span": {
      fontSize: "0.85rem"
    }
  }
}));
