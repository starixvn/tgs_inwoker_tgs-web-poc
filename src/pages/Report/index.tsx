import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Report from "@/domain/Account/Report";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import iconReport from "@/assets/t18/images/account/badge/icon-report.svg";
import { useRwd } from "@/hooks/useRwd";
import AccountPaper from "@/components/AccountPaper";

const ReportContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const ReportPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("affiliate.report"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  return (
    <ReportContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper pageName={i18n.t("affiliate.report")} iconUrl={iconReport}>
        <Report alert={alert} history={history} />
      </AccountPaper>
    </ReportContainer>
  );
};

export default ReportPage;
