import React from "react";
import CardPrev from "@/domain/Account/CardPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useNavigate } from "@/hooks/pageProps/useNavigate";
import styled from "styled-components";
import { useRwd } from "@/hooks/useRwd";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import i18n from "@/utils/i18n";
import iconWithdrawal from "@/assets/images/account/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/AccountPaper";

const CardContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const Card = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { navigate } = useNavigate();
  const { isDesktopSize } = useRwd();

  return (
    <CardContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper
        pageName={i18n.t("common.withdrawal")}
        iconUrl={iconWithdrawal}
      >
        <CardPrev appHistory={history} alert={alert} navigate={navigate} />;
      </AccountPaper>
    </CardContainer>
  );
};

export default Card;
