import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import AddCardPrev from "@/domain/Account/CardPrev/AddCardPrev";
import styled from "styled-components";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import i18n from "@/utils/i18n";
import iconWithdrawal from "@/assets/images/account/badge/icon-withdrawal.svg";
import { useRwd } from "@/hooks/useRwd";
import AccountPaper from "@/components/AccountPaper";

const CardContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const AddCard = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <CardContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper
        pageName={i18n.t("common.withdrawal")}
        iconUrl={iconWithdrawal}
      >
        <AddCardPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </CardContainer>
  );
};

export default AddCard;
