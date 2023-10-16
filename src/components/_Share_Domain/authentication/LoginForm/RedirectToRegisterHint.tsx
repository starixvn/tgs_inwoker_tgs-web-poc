import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import i18n from "@/utils/i18n";

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
  }
`;

type Props = {};
const RedirectToRegisterHint = (props: Props) => {
  return (
    <CreateAccountContainer>
      <span>{i18n.t("T13.proceedRegister")}</span>
      <Link to={"/register"} className="link">
        {i18n.t("common.register")}
      </Link>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToRegisterHint);
