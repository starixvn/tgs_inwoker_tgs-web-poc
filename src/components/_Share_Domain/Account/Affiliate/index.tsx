import AffiliateInfoRow from "@/components/_Share_Domain/Account/Affiliate/AffiliateInfoRow";
import RebateTable from "@/components/_Share_Domain/Account/Affiliate/RebateTable";
import { Button } from "@/components/Mobile/components/UI/Button";
import { useRebateTable } from "@/hooks/account/affiliate/useRebateTable";
import { themeList } from "@/theme";
import QRCode from "react-qr-code";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import React from "react";
import { Select } from "@/components/Mobile/components/UI/Select";
import { FormControl } from "@/components/Mobile/styles/forms";
import { ImageActionEnum, useImageActions } from "@/hooks/useImageActions";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

const theme = themeList["mobileT18"];

const AffiliateContainer = styled.div`
  color: ${theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 9px;
`;

const AffiliateTitle = styled.h2`
  padding: 0;
  margin-block: 0;
  margin-inline: 0;
  font-size: 1.5rem;
  margin-bottom: 14px;
`;

const QRCodeContainer = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 18px;
`;
const ActionButtonContainer = styled.div`
  width: 288px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 34px;

  & > * {
    width: 110px;
    height: 27px;
    font-size: 1rem;
    padding: 4px 36px;
    border-radius: 5px;
  }
`;

const AffiliateInfoRowContainer = styled.div`
  width: 100%;
  & > div {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  margin-bottom: 27px;
`;

type Props = {};
const Affiliate = (props: Props) => {
  const { account } = useAccountStore();
  const {
    rebateItemList,
    selectedRebateItem,
    handleChangeSelectItem,
    rebateTableRow,
    affiliateLink,
  } = useRebateTable();

  const { imageId, handleQrAction, isCopied, isDownloaded } = useImageActions();

  return (
    <AffiliateContainer>
      <AffiliateTitle>{i18n.t("affiliate.qrCode")}</AffiliateTitle>

      <QRCodeContainer id={imageId}>
        <QRCode value={affiliateLink} />
      </QRCodeContainer>

      <ActionButtonContainer>
        <Button
          variant={isCopied ? "outlined" : "contained"}
          onClick={() => handleQrAction(ImageActionEnum.COPY)}
        >
          {isCopied ? i18n.t("affiliate.copied") : i18n.t("common.copy")}
        </Button>
        <Button
          variant={isDownloaded ? "outlined" : "contained"}
          onClick={() => handleQrAction(ImageActionEnum.DOWNLOAD)}
        >
          {isDownloaded ? i18n.t("common.download") : i18n.t("common.download")}
        </Button>
      </ActionButtonContainer>

      <AffiliateInfoRowContainer>
        <AffiliateInfoRow
          label={i18n.t("affiliate.promoId")}
          value={account.info.playercode}
        />
        <AffiliateInfoRow
          label={i18n.t("affiliate.promoLink")}
          value={affiliateLink}
        />
      </AffiliateInfoRowContainer>

      <AffiliateTitle style={{ alignSelf: "flex-start" }}>
        {i18n.t("rebateRate.title")}
      </AffiliateTitle>

      <FormControl style={{ marginBottom: "20px" }}>
        <Select
          fullWidth
          disableUnderline
          native
          value={selectedRebateItem.value}
          onChange={handleChangeSelectItem}
        >
          {rebateItemList.map((rebateItem, index) => {
            return (
              <option key={index} value={rebateItem.value}>
                {/*{i18n.t("deposit.msgPlsSelectPayment")}*/}
                {i18n.t(`common.${rebateItem.label}`)}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <RebateTable rebateTableRow={rebateTableRow} />
    </AffiliateContainer>
  );
};

export default Affiliate;
