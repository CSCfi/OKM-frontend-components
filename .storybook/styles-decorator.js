import React from "react";
import { StylesProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import Theme from "../src/lib/themes/theme";

const StylesDecorator = storyFn => (
  <StylesProvider injectFirst>
    <CssBaseline />
    <StyledThemeProvider theme={Theme}>
      <MuiThemeProvider theme={Theme}>{storyFn()}</MuiThemeProvider>
    </StyledThemeProvider>
  </StylesProvider>
);

export default StylesDecorator;