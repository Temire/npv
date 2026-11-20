import * as React from "react";
import { InputBox } from "./date.styles";
import { useField } from "formik";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FormHelperText } from "@mui/material";
import { BsCalendar2Date } from "react-icons/bs";

interface CustomInputProps {
  name: string;
  label: string;
  isMultiline?: boolean;
  mRow?: number;
  isLabelAtTop?: boolean;
  fullWidth?: boolean;
  variant?: string;
  onChange: any;
  value: any;
  onBlur: any;
  disabled?: boolean;
}

export const PyDate: React.FC<CustomInputProps> = ({
  fullWidth,
  variant = "outlined",
  name,
  isLabelAtTop = true,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <InputBox fullWidth={fullWidth}>
      <DateTimePicker
        className="input"
        {...field}
        {...props}
        disablePast
        slots={{
          openPickerIcon: BsCalendar2Date
        }}
        slotProps={{
          inputAdornment: {
            position: "start"
          },
          textField: {
            InputLabelProps: {
              shrink: isLabelAtTop
            }
          }
        }}
      />

      {meta.touched && meta.error && (
        <FormHelperText className={"feedback"}>{meta.error}</FormHelperText>
      )}
    </InputBox>
  );
};
