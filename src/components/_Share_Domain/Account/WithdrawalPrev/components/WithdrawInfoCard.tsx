import React, { useCallback, useEffect, useState } from "react";
import i18n from "@/utils/i18n";
import Common from "@/utils/Common";
import styled from "styled-components";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { WalletService } from "@/api-services/services/WalletService";
import { GetMinWithdrawLimitResDto } from "@/models/dto/withdraw/GetMinWithdrawLimitResDto";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const CardContainer = styled.div`
  background: ${theme.primaryLight};
  color: ${theme.white};
  padding: 25px 37px;
  border-radius: 5px;
  font-size: 0.937rem;
  line-height: 1.098rem;
`;
const RowContainer = styled.div`
  border-left: 6px solid ${theme.tertiary};
  padding-left: 10px;

  &:first-child {
    margin-bottom: 28px;
  }
`;

const Label = styled.div`
  margin-bottom: 8px;
`;
const Value = styled.div``;

type Props = {};
const WithdrawInfoCard = (props: Props) => {
  const [minWithdrawLimit, setMinWithdrawLimit] = useState(0);

  const getMinWithdrawLimit = useCallback(async () => {
    const result =
      (await WalletService.GetMinWithdrawLimit()) as unknown as GetMinWithdrawLimitResDto;
    if (!result.IsSuccess) {
      return;
    }

    setMinWithdrawLimit(result.data);
  }, []);

  useEffect(() => {
    getMinWithdrawLimit().then();
  }, []);

  const { wallet } = useWalletStore();
  return (
    <CardContainer>
      {/*您可提款餘額為*/}
      <RowContainer>
        <Label>{i18n.t("withdrawal.msgCanWithdrawal")}</Label>
        <Value>
          {wallet.mainSymbol}
          {Common.formatNumberWithThousand(wallet.mainBalance)}
        </Value>
      </RowContainer>

      <RowContainer>
        {/*流水需求*/}
        <Label>{i18n.t("withdrawal.turnover")}</Label>
        <Value>
          {wallet.mainSymbol}
          {Common.formatNumberWithThousand(minWithdrawLimit)}
        </Value>
      </RowContainer>
    </CardContainer>
  );
};

export default WithdrawInfoCard;
