import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import Dialog from "@/components/UI/Dialog/Dialog";
import ForgotPasswordPrev from "@/domain/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName/usePageName";

const TitleContainer = styled.div`
  font-size: 2.5rem !important;
  line-height: 3.5rem !important;
  font-weight: 700 !important;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 66px 0 41px;
  white-space: nowrap;
  overflow: visible;

  & > .bottom-border {
    width: 68px;
    height: 5px;
    background: #6152dd;
  }
`;

type Props = {};
const ForgotPasswordPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("forgotPassword.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <>
      <TitleContainer>
        {i18n.t("forgotPassword.title")}
        <div className="bottom-border" />
      </TitleContainer>
      {/*<ForgetPasswordFrom />*/}
      <ForgotPasswordPrev alert={alert} history={history} />
    </>
  );
};

export default ForgotPasswordPage;
