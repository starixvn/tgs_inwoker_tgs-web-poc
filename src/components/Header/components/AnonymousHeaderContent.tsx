import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { styled as muiStyled } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/hooks/useRwd";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";
import i18n from "@/utils/i18n";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${media.sm} {
    gap: 10px;
  }
`;

export const HeaderButton = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  padding: "12px 20px",
  lineHeight: "1.318rem",
  fontWeight: 500,
  borderRadius: "12px",
  color: "white",
  fontSize: "1rem",
  "&:disabled": {
    background: theme.palette.tertiary.dark,
    color: theme.palette.common.white,
  },

  [theme.breakpoints.up("sm")]: {
    padding: "7px 20px",
    borderRadius: "5px",
    fontSize: "1rem",
    lineHeight: "1,171rem",
  },
}));

type Props = {};
const AnonymousHeaderContent = (props: Props) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleLoginDialog, handleToggleRegisterDialog } =
    useAuthDialog();

  const toggleLoginDialog = useCallback(() => {
    if (isDesktopSize) {
      handleToggleLoginDialog(true);
      return;
    }

    history.push("/login");
  }, []);

  const toggleRegisterDialog = useCallback(() => {
    if (isDesktopSize) {
      handleToggleRegisterDialog(true);
      return;
    }
    history.push("/register");
  }, []);

  return (
    <ButtonContainer>
      <HeaderButton
        onClick={toggleLoginDialog}
        style={{
          background: "#5D50E0",
        }}
      >
        {i18n.t("common.login")}
      </HeaderButton>

      <HeaderButton
        color={"primary"}
        onClick={toggleRegisterDialog}
        style={{ background: "#E7415A", color: "white", fontSize: "1rem" }}
      >
        {i18n.t("common.register")}
      </HeaderButton>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
