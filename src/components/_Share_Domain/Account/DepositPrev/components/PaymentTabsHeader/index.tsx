import React, { useMemo } from "react";
import i18n from "@/utils/i18n";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import styled from "styled-components";
import Badge from "@/components/_Share_Domain/Account/DepositPrev/components/PaymentTabsHeader/Badge";

const BadgeContainer = styled.div`
  display: flex;
  gap: 5px 14px;
  flex-wrap: wrap;
  margin-bottom: 12px;
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
  const transferChannels = wallet.depositList;

  const depositTypes = useMemo(() => {
    return wallet.depositTypeList.sort(function (a, b) {
      return a.displayorder - b.displayorder;
    });
  }, [wallet.depositTypeList]);

  if (!transferChannels?.length) return null;

  return (
    <BadgeContainer>
      {depositTypes.map((depositType, index) => {
        const { paymentcode, paymentid } = depositType;
        return (
          <Badge
            key={paymentid}
            text={i18n.t(paymentcode)}
            isActive={index === selectedPaymentIndex}
            handleClick={() => handlePaymentChange({}, index)}
          />
        );
      })}
    </BadgeContainer>
  );
  // return (
  //   <CustomTabs
  //     value={selectedPaymentIndex}
  //     onChange={handlePaymentChange}
  //     variant="scrollable"
  //     scrollButtons="auto"
  //   >
  //     {depositTypes.map((depositType, index) => {
  //       return (
  //         <Tab
  //           key={index}
  //           value={index}
  //           label={i18n.t(depositType.paymentcode)}
  //         ></Tab>
  //       );
  //     })}
  //   </CustomTabs>
  // );
};

export default React.memo(PaymentTabsHeader);
