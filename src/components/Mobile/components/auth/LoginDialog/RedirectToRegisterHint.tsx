import React, { useCallback } from "react";
import styled from "styled-components";
import { useAuthDialog } from "@/hooks/useAuthDialog";

const CreateAccountContainer = styled.div`
  color: white;
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  align-items: center;

  .login {
    color: #5d50e0;
    margin-left: 8px;
  }
`;

type Props = {};
const RedirectToRegisterHint = (props: Props) => {
  const { toggleLoginDialog, toggleRegisterDialog } = useAuthDialog();

  const handleRedirectToRegister = useCallback(() => {
    toggleLoginDialog();
    toggleRegisterDialog();
  }, []);

  return (
    <CreateAccountContainer>
      <span>Don't have an account?</span>
      <span className="register" onClick={handleRedirectToRegister}>
        Create Account
      </span>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToRegisterHint);
