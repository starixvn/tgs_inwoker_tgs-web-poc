import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
const RedirectToLoginHint = (props: Props) => {
  const history = useHistory();

  const handleRedirectToLogin = useCallback(() => {
    history.push("/login");
  }, []);

  return (
    <CreateAccountContainer>
      <span>Already Have An Account?</span>
      <span className={"login"} onClick={handleRedirectToLogin}>
        Login
      </span>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToLoginHint);
