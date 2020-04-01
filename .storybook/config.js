import { addDecorator, configure } from "@storybook/react";
import StylesDecorator from "./styles-decorator";
import "../src/lib/css/tailwind.src.css";
import "../src/lib/css/tailwind.css";
import "../src/lib/css/common.css";

addDecorator(StylesDecorator);

configure(require.context("../src", true, /\.stories\.js$/), module);
