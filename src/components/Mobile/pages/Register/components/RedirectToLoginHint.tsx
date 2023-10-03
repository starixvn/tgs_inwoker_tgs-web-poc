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
const RedirectToLoginHint = (props: Props) => {
  return (
    <CreateAccountContainer>
      <span>{i18n.t("T13.proceedLogin")}</span>
      <Link to={"/login"} className={"link"}>
        {i18n.t("common.login")}
      </Link>
    </CreateAccountContainer>
  );
};

export default React.memo(RedirectToLoginHint);
