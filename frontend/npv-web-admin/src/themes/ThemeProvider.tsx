import * as React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { theme } from "./themes";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);
