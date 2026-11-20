import { FormControl, styled } from "@mui/material";

export const SelectInputBox = styled(FormControl)(({ theme, color }) => ({
  width: "100%",
  margin: "0.5rem 0",

  "& .MuiInputLabel-formControl": {
    fontSize: "0.85rem",
    color: `${color ?? theme.palette.text}`
  },

  "& .MuiInputLabel-formControl.Mui-focused": {
    padding: "0 8px"
  },

  "& .MuiInputLabel-outlined": {
    fontSize: "0.865rem",
    color: theme.palette.secondary.main,
    fontWeight: 600,
    backgroundColor: "#ffffff",
    padding: "0.25rem 0.5rem"
    // transform: "translate(14px, 12px) scale(1)"
  },

  "& .MuiFormLabel-root.Mui-focused": {
    color: theme.palette.text
  },

  "&.MuiFormLabel-root.Mui-error": {
    color: "#F44336"
  },

  "& .feedback": {
    color: "crimson",
    fontWeight: 500,
    paddingBottom: theme.spacing(1.5),

    "& span": {
      fontSize: "0.85rem"
    }
  },

  "& .select__input": {
    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(121, 121, 121, 0.87)",
      borderWidth: 1
    },

    "& .MuiSelect-outlined.MuiSelect-outlined": {
      padding: "0.75rem 1rem",
      color: theme.palette.text
    },

    "& .MuiSelect-iconOutlined": {
      color: theme.palette.primary.main
    },

    "& .MuiInputBase-input": {
      // backgroundColor: "#eaeff1",
    }
  },

  "& .MuiButtonBase-root-MuiMenuItem-root": {
    padding: "1.25rem 0.875rem",
    color: "#787878",

    "&:hover": {
      color: "#0C0C0C"
    }
  }
}));
