import {
  BaseSelectProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import * as React from "react";
import { SelectInputBox } from "./select.styles";
// import { ArrowDownIcon } from "../../../assets/svg";
import { useField } from "formik";
import { FaChevronDown } from "react-icons/fa6";

interface SelectItemsProps {
  name: string;
}

interface NpvSelectProps extends BaseSelectProps {
  hasObjects?: boolean;
  selectItems?: string[];
  helperText?: string | false;
  selectInputProps?: SelectInputProps;
  selectableObjects?: SelectItemsProps[] | any[];
  useValue?: boolean;
  isLabelAtTop?: boolean;
  icon?: any;
  onChange: any;
}

export const NpvSelect: React.FC<NpvSelectProps> = ({
  hasObjects,
  helperText,
  selectItems,
  selectableObjects,
  useValue = false,
  isLabelAtTop = true,
  name,
  icon,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(name as string);

  return (
    <SelectInputBox>
      <InputLabel shrink={isLabelAtTop}>{props.label}</InputLabel>
      <Select
        sx={{
          "& .MuiList-root": {
            borderRadius: "0.5rem !important",
            padding: "0 !important"
          },

          "& svg": { marginRight: "1rem !important" }
        }}
        className="select__input"
        {...props}
        {...field}
        onChange={onChange}
        IconComponent={FaChevronDown}>
        {props.placeholder && (
          <MenuItem
            sx={{
              padding: "0.875rem 1.25rem",
              color: "#787878",
              fontWeight: 600,
              fontSize: "0.875rem",

              "&:hover": {
                color: "#0C0C0C",
                background: "#E2EDFE"
              }
            }}
            disabled
            value=""
            selected>
            {props.placeholder}
          </MenuItem>
        )}
        {hasObjects
          ? selectableObjects?.map((item, idx) => (
              <MenuItem
                sx={{
                  padding: "0.875rem 1.25rem",
                  color: "#787878",
                  fontWeight: 600,
                  fontSize: "0.875rem",

                  "&:hover": {
                    color: "#0C0C0C",
                    background: "#E2EDFE"
                  }
                }}
                value={useValue ? item.value : item.name}
                key={idx}>
                <div className="flex">{item.name}</div>
              </MenuItem>
            ))
          : selectItems?.map((item, idx) => (
              <MenuItem
                sx={{
                  padding: "0.875rem 1.25rem",
                  color: "#787878",
                  fontWeight: 600,
                  fontSize: "0.875rem",

                  "&:hover": {
                    color: "#0C0C0C",
                    background: "#E2EDFE"
                  }
                }}
                value={item}
                key={idx}>
                {item}
              </MenuItem>
            ))}
      </Select>

      {meta.touched && meta.error && (
        <FormHelperText className={"feedback"}>{meta.error}</FormHelperText>
      )}
    </SelectInputBox>
  );
};
