import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "@/utils/Common";
import "react-lazy-load-image-component/src/effects/blur.css";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import { utility } from "@/utils/utility";
import ResultPopupDialog from "@/components/_Share_Domain/Account/DepositPrev/components/ResultPopupDialog";
import {
  FormControl,
  LabelContainer,
  ItemContainer,
  Remark,
} from "@/components/Mobile/styles/forms";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { TextField } from "@/components/UI/TextField";
import Avatar from "@/components/Mobile/components/Avatar";

const GMOstyle = config.brand === "GMO";

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const TransferContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  color: white;
`;
const TransferLabel = styled.div``;
const TransferValue = styled.div``;

const ExchangeRateContainer = styled.div`
  margin: 20px auto;
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `28px`)};
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `normal`)};
  padding: 0px 20px 20px 48px;
`;

const QRCodeImg = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;

const CopyIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 20px;
  background-color: ${({ theme }) => theme.primary};
  mask: url(${process.env.PUBLIC_URL + `/assets/images/deposit/copy.png`})
    no-repeat center / contain;
  cursor: pointer;
`;

const HintText = styled.div`
  color: ${({ theme }) => theme.primary};
`;

const InputWrapper = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-right: 100px;
  border-radius: 16px;
  width: 100%;
`;

const AmountHint = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.937rem;
  font-weight: 400;
  margin-top: 9px;
  text-align: center;
`;

const FeeSpot = styled.div`
  margin-bottom: 17px;
  span {
    font-weight: bold;
  }
`;

class Main extends Component {
  render() {
    const methodCode = (method) => {
      return (
        this.props.wallet.depositTypeList[
          this.props.selectedPaymentIndex
        ].method[this.props.selectedMethodIndex].methodcode.toUpperCase() ===
        method.toUpperCase()
      );
    };

    const alteredPaymentCode = (payment) => {
      return this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
        .alteredpaymentcode
        ? this.props.wallet.depositTypeList[
            this.props.selectedPaymentIndex
          ].alteredpaymentcode.toUpperCase() === payment.toUpperCase()
        : false;
    };

    const paymentCode = (payment) => {
      return (
        this.props.wallet.depositTypeList[
          this.props.selectedPaymentIndex
        ].paymentcode.toUpperCase() === payment.toUpperCase()
      );
    };

    const performCopy = (content) => {
      this.props.alert("", i18n.t("affiliate.copied"));

      utility.copy(content);
    };

    const CopyFeature = ({ copyContent }) => {
      return (
        <CopyIcon
          onClick={() => {
            performCopy(copyContent);
          }}
        />
      );
    };

    const formatBankCardDetail = (data) => {
      var detail = "";
      switch (data.banktype.toUpperCase()) {
        case "BANK":
          detail = `${data.detail.bankName || ""} - ${
            data.detail.name || ""
          } - ${data.detail.bankAccount || ""}`;
          break;
        case "EWALLET":
        case "E-WALLET":
          detail = `${data.detail.phone || ""} - ${
            data.detail.eMoneyName || ""
          }`;
          break;
        case "PULSA":
          detail = `${data.detail.phone || ""}`;
          break;
        default:
          detail = `${
            data.detail.bankAccount || data.detail.address || data.detail.phone
          }`;
          break;
      }
      return detail;
    };

    return (
      <>
        {!config.features.Deposit_AddCard ? (
          <>
            {this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .paymentcode === "ZeroNineNinePay" && (
              <ItemContainer>
                <LabelContainer>
                  <HintText>{i18n.t("hint._099")}</HintText>
                </LabelContainer>
              </ItemContainer>
            )}

            {/*1. 请选择支付方式 */}
            <ItemContainer>
              <LabelContainer>
                {i18n.t("deposit.msgPlsSelectPayment")}
              </LabelContainer>
              <FormControl variant="outlined">
                <Select
                  native
                  id="customSelect"
                  value={this.props.selectedMethodIndex}
                  onChange={(e) => this.props.handleMethodChange(e)}
                >
                  <option value={""} disabled>
                    {i18n.t("deposit.msgPlsSelectPayment")}
                  </option>
                  {this.props.wallet.depositTypeList.length > 0 &&
                    this.props.wallet.depositTypeList[
                      this.props.selectedPaymentIndex
                    ].method.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {config.features.CustomKING8Deposit &&
                          (paymentCode("manual") ||
                            alteredPaymentCode("manual")) &&
                          i18n.exists(`king8.${item.methodcode}`)
                            ? i18n.t(`king8.${item.methodcode}`)
                            : i18n.t(item.methodcode)}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            </ItemContainer>
          </>
        ) : (
          //请输入银行名称
          <ItemContainer>
            <LabelContainer>
              {i18n.t("idr1.pleaseEnterAccountName")}
            </LabelContainer>
            <FormControl variant="outlined">
              <Select
                native
                id="customSelect"
                value={this.props.selectedBankCard}
                onChange={(e) => this.props.handleBankCardChange(e)}
              >
                <option value="" disabled>
                  {i18n.t("idr1.pleaseEnterAccountName")}
                </option>
                {this.props.bankCardList.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {formatBankCardDetail(item)}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </ItemContainer>
        )}

        {/*请选择支付渠道*/}
        {!(
          config.features.Deposit_HideDepositChannel ||
          config.features.Deposit_AddCard
        ) && (
          <ItemContainer>
            <LabelContainer>
              {i18n.t("deposit.msgPlsSelectMethod")}
            </LabelContainer>
            <FormControl variant="outlined">
              <Select
                native
                id="customSelect"
                value={this.props.selectedChannelIndex}
                onChange={(e) => this.props.handleChannelChange(e)}
              >
                {this.props.wallet.depositTypeList.length > 0 &&
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel.map(
                    (item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item.channelname}
                        </option>
                      );
                    }
                  )}
              </Select>
            </FormControl>
          </ItemContainer>
        )}

        {/*轉帳賬戶*/}
        {(() => {
          if (
            config.features.Deposit_AddCard &&
            this.props.selectedBankCard !== ""
          ) {
            var channel =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ];
            var channelExtend =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].extended;
            if (
              !methodCode("BANKTRANSFER") &&
              !methodCode("EWALLET") &&
              !methodCode("PULSA")
            ) {
              return <></>;
            }

            return (
              <ItemContainer>
                <LabelContainer>
                  {i18n.t("deposit.transferAccount")}
                </LabelContainer>

                {methodCode("BANKTRANSFER") && (
                  <TransferContainer>
                    <TransferLabel>
                      {i18n.t("deposit.details.bank")}:
                    </TransferLabel>
                    {channel.channelname && (
                      <React.Fragment>
                        <TransferValue>{channel.channelname}</TransferValue>
                        <CopyFeature copyContent={channel.channelname} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
                {methodCode("BANKTRANSFER") && (
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.accName")}:</TransferLabel>
                    {channelExtend.name && (
                      <React.Fragment>
                        <TransferValue>{channelExtend.name}</TransferValue>
                        <CopyFeature copyContent={channelExtend.name} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}

                {methodCode("BANKTRANSFER") && (
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.cardNum")}:</TransferLabel>
                    {channelExtend.bankAccount && (
                      <React.Fragment>
                        <TransferValue>
                          {channelExtend.bankAccount}
                        </TransferValue>
                        <CopyFeature copyContent={channelExtend.bankAccount} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
                {(methodCode("EWALLET") || methodCode("PULSA")) && (
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.phone")}:</TransferLabel>
                    {channelExtend.phone && (
                      <React.Fragment>
                        <TransferValue>{channelExtend.phone}</TransferValue>
                        <CopyFeature copyContent={channelExtend.phone} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
                {methodCode("EWALLET") && (
                  <TransferContainer>
                    <TransferLabel>
                      {i18n.t("deposit.eWalletAccount")}:
                    </TransferLabel>
                    {channelExtend.eMoneyName && (
                      <React.Fragment>
                        <TransferValue>
                          {channelExtend.eMoneyName}
                        </TransferValue>
                        <CopyFeature copyContent={channelExtend.eMoneyName} />
                      </React.Fragment>
                    )}
                  </TransferContainer>
                )}
              </ItemContainer>
            );
          }
        })()}

        {(() => {
          const generateDisplayContent = (content) => {
            var displaysequence = [
              "name",
              "address",
              "bankAccount",
              "eMoneyName",
              "phone",
            ];

            return Object.keys(content)
              .sort((a, b) => {
                return displaysequence.indexOf(a) - displaysequence.indexOf(b);
              })
              .map((key, index) => {
                if (content[key] !== "" && content[key]) {
                  if (typeof content[key] === "number") {
                    return <></>;
                  } else if (content[key].includes("http")) {
                    return (
                      <>
                        <QRCodeImg
                          src={content[key]}
                          alt={content[key]}
                          key={index}
                        />
                      </>
                    );
                  } else {
                    return (
                      <TransferContainer key={index}>
                        <TransferLabel>
                          {i18n.t("extended." + [key])}:
                        </TransferLabel>
                        <TransferValue>{content[key]}</TransferValue>

                        <CopyFeature copyContent={content[key]} />
                      </TransferContainer>
                    );
                  }
                }
              });
          };

          if (
            (paymentCode("manual") ||
              paymentCode("usdt") ||
              alteredPaymentCode("usdt") ||
              alteredPaymentCode("manual")) &&
            !config.features.Deposit_AddCard
          ) {
            var channelExtend =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].extended;

            if (methodCode("THIRDPARTY")) {
              return (
                <ItemContainer>
                  <LabelContainer>
                    {i18n.t("deposit.transferAccount")}
                  </LabelContainer>
                  <QRCodeImg src={channelExtend.qrCode} />
                </ItemContainer>
              );
            } else {
              return (
                <ItemContainer>
                  <LabelContainer>
                    {i18n.t("deposit.transferAccount")}
                  </LabelContainer>
                  {generateDisplayContent(channelExtend)}
                </ItemContainer>
              );
            }
          }
        })()}

        {(() => {
          if (config.features.Deposit_ManualApplePayHideBankAcc) {
          } else {
            if (
              paymentCode("MANUAL") ||
              paymentCode("APPLEPAY") ||
              alteredPaymentCode("manual")
            ) {
              return (
                <>
                  {!(
                    config.features.Deposit_RemoveAccount ||
                    methodCode("USDT") ||
                    config.features.Deposit_AddCard
                  ) && (
                    <>
                      {this.props.wallet.bankCardList.length > 1 &&
                      !config.features.Deposit_AccountNameManualInput ? (
                        <ItemContainer>
                          <LabelContainer>
                            {config.features.Deposit_OriginAccount
                              ? i18n.t("idr1.pleaseEnterAccountName")
                              : i18n.t("common.pleaseEnterAccountName")}
                          </LabelContainer>
                          <FormControl variant="outlined">
                            <Select
                              native
                              id="customSelect"
                              value={this.props.selectedBankCard}
                              onChange={(e) =>
                                this.props.handleSelectAccountChange(e)
                              }
                            >
                              <option value="">
                                {config.features.Deposit_OriginAccount
                                  ? i18n.t("idr1.pleaseEnterAccountName")
                                  : i18n.t("common.pleaseEnterAccountName")}
                              </option>
                              {this.props.wallet.bankCardList.map(
                                (item, index) => {
                                  var detail = item.detail;
                                  return (
                                    <option value={item.id} key={index}>
                                      {detail.bankAccount ||
                                        detail.address ||
                                        detail.phone}{" "}
                                      ({item.banktype})
                                    </option>
                                  );
                                }
                              )}
                            </Select>
                          </FormControl>
                        </ItemContainer>
                      ) : (
                        <TextField
                          style={{ margin: "20px auto 20px auto" }}
                          type={"text"}
                          placeholder={
                            config.features.Deposit_OriginAccount
                              ? i18n.t("idr1.pleaseEnterAccountName")
                              : i18n.t("common.pleaseEnterAccountName")
                          }
                          label={
                            config.features.Deposit_OriginAccount
                              ? i18n.t("idr1.pleaseEnterAccountName")
                              : i18n.t("common.pleaseEnterAccountName") +
                                (config.features.Deposit_AddTips
                                  ? " *" + i18n.t("mgm.accountDepositTips")
                                  : "")
                          }
                          value={this.props.account}
                          disabled={
                            !config.features.Deposit_AccountNameManualInput &&
                            config.features.Deposit_AutofillFirstCard &&
                            this.props.wallet.bankCardList.length > 1
                          }
                          onChange={(e) => this.props.handleAccountChange(e)}
                        />
                      )}
                    </>
                  )}
                  {(!(
                    config.features.Deposit_RemoveName || methodCode("fps")
                  ) ||
                    config.features.Deposit_FPSWithName) && (
                    <>
                      {/*请输入银行账户名称*/}
                      <TextField
                        style={{ margin: "20px auto 20px auto" }}
                        type={"text"}
                        placeholder={
                          config.features.Deposit_CustomBankNameTranslation
                            ? i18n.t("mgm.msgPlsEnterAccount")
                            : config.features.Deposit_EnglishName
                            ? i18n.t("bet28.msgEnterBankAccountName")
                            : i18n.t("deposit.msgPlsEnterAccount")
                        }
                        label={
                          (config.features.Deposit_CustomBankNameTranslation
                            ? i18n.t("mgm.msgPlsEnterAccount")
                            : config.features.Deposit_EnglishName
                            ? i18n.t("bet28.BankAccountName")
                            : i18n.t("deposit.msgPlsEnterAccount")) +
                          (config.features.Deposit_AddTips
                            ? " *" + i18n.t("mgm.nameDepositTips")
                            : "")
                        }
                        value={this.props.name}
                        onChange={(e) => this.props.handleNameChange(e)}
                      />
                    </>
                  )}
                </>
              );
            }
          }
        })()}

        {/*請輸入存款金額*/}
        <ItemContainer>
          <LabelContainer>{i18n.t("deposit.depositAmount")}</LabelContainer>
          <FormControl variant="outlined">
            <TextField
              fullWidth
              value={this.props.amount}
              onChange={this.props.handleAmountChange}
              type={"number"}
              placeholder={
                i18n.t("deposit.msgPleaseEnter") +
                Common.formatNumberWithThousand(
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel[
                    this.props.selectedChannelIndex
                  ].transferlimit.from
                ) +
                "-" +
                Common.formatNumberWithThousand(
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel[
                    this.props.selectedChannelIndex
                  ].transferlimit.to
                ) +
                i18n.t("deposit.dollor")
              }
            />
          </FormControl>

          <AmountHint>
            <FeeSpot>
              {i18n.t("fees.deposit")}:{" "}
              <span>
                {
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel[
                    this.props.selectedChannelIndex
                  ].fees
                }
                %
              </span>
            </FeeSpot>

            <span>
              {i18n.t("deposit.limitDeposit") +
                ": " +
                Common.formatNumberWithThousand(
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel[
                    this.props.selectedChannelIndex
                  ].transferlimit.from
                ) +
                "-" +
                Common.formatNumberWithThousand(
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel[
                    this.props.selectedChannelIndex
                  ].transferlimit.to
                ) +
                i18n.t("deposit.dollor")}
            </span>
          </AmountHint>
        </ItemContainer>

        {paymentCode("umpay") && <Remark>{i18n.t("deposit.ppRemark")}</Remark>}
        {(() => {
          if (
            methodCode("usdt") &&
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].channel[
              this.props.selectedChannelIndex
            ].extended.rate !== undefined
          ) {
            var usdtRate =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].extended.rate;
            if (
              paymentCode("manual") ||
              paymentCode("usdt") ||
              alteredPaymentCode("usdt") ||
              alteredPaymentCode("manual")
            ) {
              return (
                <ExchangeRateContainer style={{ marginTop: "4px" }}>
                  {/*汇率*/}
                  <LimitLabel>
                    {i18n.t("deposit.exchangeRate")} 1 {`${config.currency}`} :{" "}
                  </LimitLabel>
                  <LimitAmount>{` ${usdtRate} `}</LimitAmount>
                  <LimitLabel>USDT</LimitLabel>
                  <div class="clear"></div>
                  {/*上分金额*/}
                  <LimitLabel>{i18n.t("deposit.totalAmount")}</LimitLabel>
                  {" :  "}
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
                      ? Common.formatNumberWithCommasNoRounding(
                          this.props.amount / usdtRate
                        )
                      : 0
                  }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            }
          }
        })()}
        {(() => {
          if (methodCode("Crypto")) {
            if (paymentCode("leepay")) {
              return (
                <ExchangeRateContainer style={{ marginTop: "4px" }}>
                  <LimitLabel>{i18n.t("deposit.exchangeRate")}: </LimitLabel>
                  <LimitAmount>{` ${this.props.exchangeRate.buyprice}`}</LimitAmount>
                  <LimitLabel style={{ marginLeft: "26px" }}>
                    {i18n.t("deposit.expectedPayment")}
                  </LimitLabel>{" "}
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
                      ? (
                          this.props.amount / this.props.exchangeRate.buyprice
                        ).toFixed(2)
                      : 0
                  }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            } else {
              return Object.keys(this.props.exchangeRate).map((key) => {
                return Object.keys(this.props.exchangeRate[key]).map((key2) => {
                  if (key2 === "HKD") {
                    return (
                      <ExchangeRateContainer style={{ marginTop: "4px" }}>
                        <LimitLabel>
                          {i18n.t("deposit.exchangeRate")}:{" "}
                        </LimitLabel>
                        <LimitAmount>{` ${this.props.exchangeRate[key][key2].rate}`}</LimitAmount>
                        <LimitLabel style={{ marginLeft: "26px" }}>
                          {i18n.t("deposit.expectedPayment")}
                        </LimitLabel>{" "}
                        <LimitAmount>{` ${
                          isNaN(this.props.amount) === false
                            ? (
                                this.props.amount /
                                this.props.exchangeRate[key][key2].rate
                              ).toFixed(2)
                            : 0
                        }`}</LimitAmount>
                      </ExchangeRateContainer>
                    );
                  }
                });
              });
            }
          }
        })()}

        {/*優惠活動*/}
        <ItemContainer>
          <LabelContainer>{i18n.t("deposit.promotion")}</LabelContainer>
          <FormControl variant="outlined">
            <Select
              native
              id="customSelect"
              value={this.props.depositPromotion}
              onChange={(e) => this.props.handlePromotionChange(e)}
            >
              <option value="">
                {i18n.t("deposit.msgPlsSelectPromotion")}
              </option>
              {this.props.general.promotionList.items
                .filter(
                  (item) =>
                    [
                      "FirstDeposit",
                      "DailySecondDeposit",
                      "DailyFirstDeposit",
                      "DepositReward",
                      "DepositAccumulateRoulette",
                    ].indexOf(item.promotionType) >= 0 &&
                    (item.promotionType === "DepositReward"
                      ? this.props.amount >=
                        item.campaignDetail.depositMinimumLimit
                      : true)
                )
                .map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
        </ItemContainer>

        {/*上傳憑證*/}
        {(() => {
          if (
            paymentCode("manual") ||
            alteredPaymentCode("usdt") ||
            alteredPaymentCode("manual")
          ) {
            return (
              <>
                <ItemContainer>
                  <LabelContainer>
                    {i18n.t("deposit.uploadReceipt")}
                  </LabelContainer>

                  <Button
                    onClick={() => {
                      document.getElementById("getFile").click();
                    }}
                    variant={"outlined"}
                    style={{
                      height: "58px",
                      borderRadius: "5px",
                      color: "white",
                      borderColor: "white",
                    }}
                  >
                    {i18n.t("common.upload")}
                  </Button>

                  <input
                    type="file"
                    id="getFile"
                    onChange={this.props.handleFileChange}
                    accept="image/jpg, image/jpeg, image/png, image/tiff"
                    style={{ display: "none" }}
                  />
                  {this.props.files ? (
                    <div style={{ fontSize: 24 }}>
                      {this.props.files[0].name}
                    </div>
                  ) : (
                    ""
                  )}
                </ItemContainer>
                <Remark>
                  {i18n.t(
                    config.features.Deposit_UploadRequired
                      ? "deposit.msgPlsUploadProof"
                      : "deposit.msgNotMustUploadProof"
                  )}
                </Remark>
              </>
            );
          }
        })()}

        {/*玩家备注*/}
        {config.features.Deposit_Withdrawal_PlayerNote &&
          (methodCode("EWALLET") ||
            methodCode("PULSA") ||
            methodCode("BANKTRANSFER")) && (
            <TextField
              style={{ margin: "20px auto 20px auto" }}
              value={this.props.playerNote}
              onChange={this.props.handlePlayerNoteChange}
              placeholder={i18n.t("deposit.plsEnterPlayerNote")}
              label={i18n.t("deposit.playerNote")}
            />
          )}
        <ResultPopupDialog
          isDialogOpen={this.props.openPopup}
          handleClose={this.props.handleClosePopup}
          handleOpenPopupUrl={this.props.handleOpenPopupUrl}
        />

        {/*提交*/}
        <Button
          onClick={this.props.handleDepositClick}
          variant={"contained"}
          color={"primary"}
          fullWidth
          style={{
            padding: "11.5px",
            fontSize: "1.25rem",
            borderRadius: "5px",
          }}
          disabled={(() => {
            const transferlimit =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit;

            return (
              !!this.props.disabled ||
              this.props.amount < transferlimit.from ||
              this.props.amount > transferlimit.to ||
              this.props.amount === "" ||
              (this.props.files === null &&
                config.features.Deposit_UploadRequired &&
                methodCode("MANUAL"))
            );
          })()}
        >
          {i18n.t("common.submit")}
        </Button>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
