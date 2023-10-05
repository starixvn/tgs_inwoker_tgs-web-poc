import React, { useEffect, useState } from "react";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import { themeList } from "@/theme";
import { Switch } from "@/components/Mobile/components/UI/Switch";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";

const theme = themeList["mobileT18"];

const AutoTransferContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  color: ${theme.white};

  & > :first-child {
    margin-right: 10px;
  }
`;

type Props = {};
const AutoTransferSwitch = (props: Props) => {
  const { wallet, updateAutoTransferStatus } = useWalletStore();
  const [isChecked, setIsChecked] = useState(!!wallet.autotransfer);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchAutoTransfer = async () => {
    setIsLoading(true);
    await updateAutoTransferStatus();
    setIsLoading(false);
  };

  useEffect(() => {
    setIsChecked(!!wallet.autotransfer);
  }, [wallet.autotransfer]);

  return (
    <>
      <AutoTransferContainer>
        <CustomSwitchContainer>
          <Switch checked={isChecked} onChange={handleSwitchAutoTransfer} />
          <div>
            {isLoading}
            {i18n.t("transfer.autoTransfer")} (
            {wallet.autotransfer
              ? i18n.t("transfer.on")
              : i18n.t("transfer.off")}
            )
          </div>
        </CustomSwitchContainer>
      </AutoTransferContainer>

      <Loading show={isLoading}></Loading>
    </>
  );
};

export default React.memo(AutoTransferSwitch);
