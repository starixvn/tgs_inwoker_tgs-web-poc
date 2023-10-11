import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import ForgotPasswordPrev from "@/components/_Share_Domain/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/hooks/pageProps/useNotifications";

const TitleContainer = styled.div`
  font-size: 3rem !important;
  line-height: 3.5rem !important;
  font-weight: 700 !important;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 41px;

  & > .bottom-border {
    width: 68px;
    height: 5px;
    background: #6152dd;
  }
`;

type Props = {};
const ForgetPassword = (props: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.push("/");
  }, []);

  return (
    <Dialog isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <TitleContainer>
        {i18n.t("forgotPassword.title")}
        <div className="bottom-border" />
      </TitleContainer>
      {/*<ForgetPasswordFrom />*/}
      <ForgotPasswordPrev alert={alert} history={history} />
    </Dialog>
  );
};

export default ForgetPassword;
