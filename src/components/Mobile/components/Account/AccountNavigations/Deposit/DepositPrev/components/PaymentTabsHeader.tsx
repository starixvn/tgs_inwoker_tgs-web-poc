import React from "react";
import Tab from "@material-ui/core/Tab";
import i18n from "@/utils/i18n";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";

const StyledAppBar = withStyles({
  root: {
    top: "89px",
    backgroundColor: "#f1f1f1",
    boxShadow: "none",
  },
})(AppBar);

const CustomTabs = styled(Tabs)`
  background: ${({ theme }) => theme.tabbar};
`;

type Props = {
  selectedPaymentIndex: number;
  handlePaymentChange: (e: Object, value: any) => void;
};
const PaymentTabsHeader = ({
  selectedPaymentIndex,
  handlePaymentChange,
}: Props) => {
  const { wallet } = useWalletStore();
  const depositTypeList = wallet.depositList;

  if (!depositTypeList?.length) return null;

  return (
    <StyledAppBar>
      <CustomTabs
        value={selectedPaymentIndex}
        onChange={handlePaymentChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {wallet.depositTypeList
          .sort(function (a, b) {
            return a.displayorder - b.displayorder;
          })
          .map((depositType, index) => {
            return (
              <Tab
                key={index}
                value={index}
                label={i18n.t(depositType.paymentcode)}
              ></Tab>
            );
          })}
      </CustomTabs>
    </StyledAppBar>
  );
};

export default React.memo(PaymentTabsHeader);
