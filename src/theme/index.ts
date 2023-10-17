import { Primary } from "@storybook/blocks";

export const mobileT18 = {
  primary: "#6152DD",
  primaryDark: "#0E131B", //BG
  primaryLight: "#181F2B", //Sub BG = Main_Blue
  secondary: "#E7415A",
  tertiary: "#596578", //Gray1
  tertiaryMiddle: "#6A768B", //Gray2
  tertiaryLight: "#B2C3EC", //Gray3
  tertiaryDark: "#212937", //Gray4
  white: "#FFFFFF",
  yellow: "#F3DE4B",
  green: "#33AD4E",
  primaryGradient:
    "linear-gradient(180deg, rgba(57, 22, 164, 0.00) 8.88%, #3916A4 50.07%, rgba(57, 22, 164, 0.50) 89.25%)",
};

export const themeList = {
  mobileT18: mobileT18,
};

export const theme = themeList["mobileT18"];
