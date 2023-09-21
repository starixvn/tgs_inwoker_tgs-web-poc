import AffiliateInfoRow from "@/components/Mobile/components/Account/AccountNavigations/AffiliateDialog/Affiliate/AffiliateInfoRow";
import RebateTable from "@/components/Mobile/components/Account/AccountNavigations/AffiliateDialog/Affiliate/RebateTable";
import Button from "@/components/Mobile/components/UI/Button";
import Select from "@/components/Mobile/components/UI/Select";
import DarkSelect from "@/components/Mobile/components/UI/Select/DarkSelect";
import { useRebateTable } from "@/hooks/account/affiliate/useRebateTable";
import { themeList } from "@/theme";
import QRCode from "react-qr-code";
import styled from "styled-components";

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

const StyledSelect = styled(Select)`
  width: 100%;
`;

type Props = {};
const Affiliate = (props: Props) => {
    const {
        rebateItemList,
        selectedRebateItem,
        handleChangeSelectItem,
        rebateTableRow,
        affiliateLink,
    } = useRebateTable();

    return (
        <AffiliateContainer>
            <AffiliateTitle>REFERRAL QR Code</AffiliateTitle>

            <QRCodeContainer id="qrcode-container">
                <QRCode value={affiliateLink} />
            </QRCodeContainer>

            <ActionButtonContainer>
                <Button>Copy</Button>
                <Button>Download</Button>
            </ActionButtonContainer>

            <AffiliateInfoRowContainer>
                <AffiliateInfoRow label={"Referral ID"} value={"12"} />
                <AffiliateInfoRow label={"Affiliate Link"} value={"12"} />
            </AffiliateInfoRowContainer>

            <AffiliateTitle style={{ alignSelf: "flex-start" }}>
                Rebate Rates
            </AffiliateTitle>

            <DarkSelect
                label={""}
                selectItem={selectedRebateItem}
                handleChange={(newSelectItem) => handleChangeSelectItem(newSelectItem)}
                selectItemList={rebateItemList}
                backgroundColor={theme.primaryDark}
                style={{
                    width: "100%",
                    marginBottom: "20px",
                }}
            />

            <RebateTable rebateTableRow={rebateTableRow} />
        </AffiliateContainer>
    );
};

export default Affiliate;
