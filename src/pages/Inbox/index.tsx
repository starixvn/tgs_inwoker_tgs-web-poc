import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Inbox from "@/domain/Account/Inbox";
import styled from "styled-components";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import iconInbox from "@/assets/t18/images/account/badge/icon-inbox.svg";
import AccountPaper from "@/components/AccountPaper";
import { useRwd } from "@/hooks/useRwd";

const InboxContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const InboxPage = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    updatePageName(i18n.t("inbox.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <InboxContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("inbox.title")} iconUrl={iconInbox}>
        <Inbox alert={alert} history={history} />
      </AccountPaper>
    </InboxContainer>
  );
};

export default InboxPage;
