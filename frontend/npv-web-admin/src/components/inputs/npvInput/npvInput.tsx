import {
  StandardTextFieldProps,
  TextField,
  FormHelperText,
  InputAdornment
  //   TextFieldProps,
} from "@mui/material";
import * as React from "react";
import { InputBox } from "./input.styles";
import { useField } from "formik";

interface CustomInputProps extends StandardTextFieldProps {
  name: string;
  isMultiline?: boolean;
  mRow?: number;
  isLabelAtTop?: boolean;
  icon?: any;
  endAdornment?: any;
}

export const NpvInput: React.FC<CustomInputProps> = ({
  fullWidth,
  variant = "outlined",
  name,
  isMultiline,
  mRow,
  isLabelAtTop = true,
  icon,
  endAdornment,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <InputBox fullWidth={fullWidth}>
      <TextField
        multiline={isMultiline}
        rows={isMultiline ? (mRow ? mRow : 3) : 0}
        className="input"
        {...field}
        {...props}
        InputLabelProps={{
          shrink: isLabelAtTop
        }}
        InputProps={{
          endAdornment: (
            <>
              {endAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              )}
            </>
          ),
          startAdornment: (
            <>
              {icon && <InputAdornment position="start">{icon}</InputAdornment>}
            </>
          )
        }}
      />

      {meta.touched && meta.error && (
        <FormHelperText className={"feedback"}>{meta.error}</FormHelperText>
      )}
    </InputBox>
  );
};
