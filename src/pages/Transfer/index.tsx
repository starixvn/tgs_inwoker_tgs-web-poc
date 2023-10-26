import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TransferPrev from "@/domain/Account/TransferPrev";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import iconTransfer from "@/assets/t18/images/account/badge/icon-transfer.svg";
import { useRwd } from "@/hooks/useRwd";
import AccountPaper from "@/components/AccountPaper";

const TransferContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const Transfer = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    updatePageName(i18n.t("report.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <TransferContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("common.transfer")} iconUrl={iconTransfer}>
        <TransferPrev alert={alert} history={history} />
      </AccountPaper>
    </TransferContainer>
  );
};

export default Transfer;
