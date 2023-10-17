# How to Implement Responsive Design?

In this repository, we use two types of UI frameworks:

1. Styled Components
2. MUI (Material-UI)

Here's an example of how to implement responsive design in each of them:

> Note: We follow the mobile-first responsive design principle.

## Styled Components
```typescript jsx
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #181f2b;
  height: 80px;
  width: 100%;
  z-index: 10;

  // HERE!!!!!!!!!!!!!!!!!!!
  ${media.sm} {
    height: 60px;
  }
`;
```

## MUI
```typescript jsx
import { styled as muiStyled } from "@mui/material/styles";

export const Button = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "5px",
  padding: "12px 20px",
  fontSize: "1.125rem",
  fontWeight: 500,
  "&:disabled": {
    background: theme.palette.tertiary.dark,
    color: theme.palette.common.white,
  },

  // HERE!!!!!!!!!
  [theme.breakpoints.up("sm")]: {
    padding: "7px 20px",
  },
}))
```