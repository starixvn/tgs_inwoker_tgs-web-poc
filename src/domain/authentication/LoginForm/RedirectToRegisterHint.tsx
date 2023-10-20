import React, { useCallback } from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useRwd } from "@/hooks/useRwd";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";
import { useHistory } from "react-router";

const CreateAccountContainer = styled.div`
  color: white;
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  align-items: center;

  .link {
    color: #5d50e0;
    margin-left: 8px;
    cursor: pointer;
  }
`;

type Props = {};
const RedirectToRegisterHint = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const { handleToggleRegisterDialog, handleToggleLoginDialog } =
    useAuthDialog();
  const history = useHistory();

  const handleRedirect = useCallback(() => {
    if (!isDesktopSize) {
      return history.push("/register");
    }

    handleToggleLoginDialog(false);
    handleToggleRegisterDialog(true);
  }, []);

  return (
    <CreateAccountContainer>
      <span>{i18n.t("T13.proceedRegister")}</span>
      <span onClick={handleRedirect} className="link">
        {i18n.t("common.register")}
      </span>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToRegisterHint);
