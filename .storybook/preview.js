import "../src/lib/css/tailwind.src.css";
import "../src/lib/css/tailwind.css";
import "../src/lib/css/common.css";

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import Theme from "../src/lib/themes/theme";

export const decorators = [
  Story => (
    <StylesProvider injectFirst>
      <CssBaseline />
      <StyledThemeProvider theme={Theme}>
        <MuiThemeProvider theme={Theme}>
          <Story />
        </MuiThemeProvider>
      </StyledThemeProvider>
    </StylesProvider>
  )
];
