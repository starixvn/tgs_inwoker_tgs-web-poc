import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import Textbox from "@/components/Mobile/components/_PrevShare/Textbox";
import Common from "@/utils/Common";
import { walletAction } from "@/api-services/actions/walletAction";
import { RESET_WALLETRESULT } from "@/api-services/constant/actionType";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import i18n from "@/utils/i18n";
import Slide from "@material-ui/core/Slide";
import config from "@/config/config";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";
import WithdrawInfoCard from "@/components/_Share_Domain/Account/WithdrawalPrev/components/WithdrawInfoCard";
import ManageBankCardButton from "@/components/_Share_Domain/Account/WithdrawalPrev/components/ManageBankCardButton";
import TransferAllToWallet from "@/components/_Share_Domain/Account/WithdrawalPrev/components/TransferAllToWallet";
import {
  FormControl,
  LabelContainer,
  ItemContainer,
  Remark,
} from "@/components/Mobile/styles/forms";
import { Button } from "@/components/Mobile/components/UI/Button";
import { Select } from "@/components/Mobile/components/UI/Select";
import { TextField } from "@/components/Mobile/components/UI/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BottomDesc = styled.div`
  margin: 0 auto;
  width: 86%;
  font-size: 26px;

  color: ${({ theme }) => theme.secondary};
`;

const StyledModalBank = withStyles((theme) => ({
  paper: {
    color: "#666666",
    padding: "0 30px",
    width: "750px",
    maxWidth: "750px",
    margin: 0,
    display: "block",
    position: "absolute",
    bottom: 0,
    height: "calc(100% - 580px)",
  },
}))(Modal);

const StyledListItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: "10px",
  },
}))(ListItem);
const StyledListItemText = withStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: "50px",
    "& .MuiTypography-root": {
      fontSize: "28px",
    },
  },
}))(ListItemText);

const LeftText = styled(StyledListItemText)`
  text-align: left;
`;
const RightText = styled(StyledListItemText)`
  text-align: right;
`;

const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);

const ManageBankCardButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin: 15px auto 19px;
`;

class WithdrawalPrev extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      withdrawalInfo: {
        bonus_limit_list: [],
      },
      bankCardList: [],
      selectedBankCardIndex: "",
      defaultCard: "",
      amount: "",
      card: "",
      bankOpen: false,
      loading: false,
      open: false,
      password: "",
      otp: false,
      disabled: false,

      min: 0,
      max: 0,
      fees: 0,

      exchangeRate: config.features.Withdrawal_USDT_ExchangeRate,
      playerNote: "",
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    if (
      config.features.Deposit_AddCard &&
      this.handleFilterCardList(this.props.wallet.bankCardList).length > 0
    ) {
      this.setState({
        ...this.state,
        selectedBankCardIndex: 0,
      });
      this.getTransferLimit(
        this.handleFilterCardList(this.props.wallet.bankCardList)[0]
          .paymentchannelid
      );
    }

    if (this.props.token != null) {
      if (this.props.wallet.bankCardList.length === 0)
        this.props.getBankCardList();
      if (config.features.Withdrawal_WalletTransfer) {
        this.props.performWithdrawFromEveryBrand().then((e) => {
          this.props.getBalanceList();
          this.getAllGameBalance();
        });
      }
      // this.GetWithdrawalDetails();
      this.countDownInterval = setInterval(() => {
        this.props.getWithdrawalChannel(); // call api every 30 mins
      }, 30 * 60 * 1000);
    } else {
      this.props.appHistory.replace("/login");
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.addBillingResult !== this.props.wallet.addBillingResult &&
      this.props.wallet.addBillingResult !== null
    ) {
      this.props.getBalanceList();
    }
    if (
      preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
      this.props.wallet.withdrawalResult !== null
    ) {
      if (this.props.wallet.withdrawalResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.alert(
          "",
          i18n.t("withdrawal.msgSuccess"),
          !this.props.account.info.check_pass_account && (
            <div
              style={{ textAlign: "center", marginTop: 10 }}
              onClick={() => {
                this.props.appHistory.push({
                  pathname: "/profile/name",
                });
              }}
            >
              {i18n.t("verified.goVerify")}
            </div>
          )
        );
        this.setState({
          ...this.initialState,
        });
      } else {
        this.props.alert("", this.props.wallet.withdrawalResult.info);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.countDownInterval);
  }
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handleSubmitClick = (e) => {
    this.setState({ ...this.state, disabled: true });
    const selectedBankCardIndex = this.state.selectedBankCardIndex;
    const amount = this.state.amount;
    const formatedamount = amount.toString().replace(/,/g, "");
    if (selectedBankCardIndex === "" || selectedBankCardIndex === null) {
      this.props.alert("", i18n.t("withdrawal.msgEnterBank"));
      return this.setState({ ...this.state, disabled: false });
    } else if (config.features.Withdrawal_HundredDigit) {
      if (!/^[1-9][0-9]{0,17}00$/.test(amount)) {
        this.props.alert("", i18n.t("withdrawal.msgMustHundred"));
        return this.setState({ ...this.state, disabled: false });
      }
    }
    if (
      parseFloat(formatedamount) > parseFloat(this.props.wallet.mainBalance)
    ) {
      this.props.alert("", i18n.t("withdrawal.msgInsufficient"));
    } else if (parseFloat(formatedamount) < parseFloat(this.state.min)) {
      this.props.alert("", i18n.t("withdrawal.notReachMin"));
    } else if (parseFloat(formatedamount) > parseFloat(this.state.max)) {
      this.props.alert("", i18n.t("withdrawal.reachedMax"));
    } else {
      this.props.doWithdraw(
        formatedamount,
        this.state.password,
        this.handleFilterCardList(this.props.wallet.bankCardList)[
          this.state.selectedBankCardIndex
        ].id,
        config.features.Deposit_Withdrawal_PlayerNote
          ? this.state.playerNote
          : null
      );
    }

    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };

  handleChangeAmount = (e) => {
    var regex = /^\d+$/g;
    if (regex.test(e.target.value) || e.target.value === "") {
      this.setState({ ...this.state, amount: e.target.value });
    }
  };

  handlePlayerNoteChange = (e) => {
    this.setState({ ...this.state, playerNote: e.target.value });
  };

  handleClose = () => {
    this.props.resetResult();
  };

  handleBankClick = (e) => {
    this.setState({
      ...this.state,
      selectedBankCardIndex: e.target.value,
      // bankOpen: false
    });
  };

  getTransferLimit = (channelId) => {
    //reset everything
    var minValue = [];
    var maxValue = [];
    this.setState({
      min: 0,
      max: 0,
      fees: 0,
    });
    //update new data.

    for (var i = 0; i < this.props.wallet.withdrawalList.length; i++) {
      const methodList = this.props.wallet.withdrawalList[i].channel;
      if (methodList) {
        for (var inner = 0; inner < methodList.length; inner++) {
          const channelList = methodList[inner];
          if (channelList.channelid === channelId) {
            minValue.push(channelList.transferlimit.from);
            maxValue.push(channelList.transferlimit.to);
            this.setState({
              min: Math.min(...minValue),
              max: Math.max(...maxValue),
              fees: channelList.fees,
            });
          }
        }
      }
    }
  };

  handleConfirmOTP = () => {
    const amount = this.state.amount;

    const formatedamount = amount.toString().replace(/,/g, "");
    // if (parseFloat(formatedamount) <= 0) {
    //   this.props.alert("", i18n.t("withdrawal.msgInvalidAmt"));

    //   return;
    // }
    // this.setState({ ...this.state, otp: false });
    this.props.doWithdrawal(
      formatedamount,
      this.state.password,
      this.handleFilterCardList(this.props.wallet.bankCardList)[
        this.state.selectedBankCardIndex
      ].id
    );
  };

  getAllGameBalance = () => {
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter(
        (item) => item.abbreviation !== "NTTF" && item.abbreviation !== "RTTF"
      )
      .map((a) => {
        this.props.getGameBalance(a.gpcode).then((e) => {
          if (e.IsSuccess) {
          }
        });
      });
  };

  handleFilterCardList = (cardList) => {
    if (config.features.Deposit_AddCard) {
      return cardList.filter((item) => item.default).length <= 0
        ? cardList.filter((item, index) => index === 0)
        : cardList.filter((item) => item.default);
    } else {
      return cardList;
    }
  };

  render() {
    return (
      <>
        <WithdrawInfoCard />
        <ManageBankCardButtonContainer>
          <ManageBankCardButton />
        </ManageBankCardButtonContainer>
        {config.features.NewTransferUI && <TransferAllToWallet />}
        {/*管理銀行卡*/}
        <ItemContainer>
          <LabelContainer>{i18n.t("withdrawal.bankCard")}</LabelContainer>
          <FormControl variant="outlined">
            <Select
              value={this.state.selectedBankCardIndex}
              native
              onChange={(e) => {
                this.handleBankClick(e);
                this.getTransferLimit(
                  this.handleFilterCardList(this.props.wallet.bankCardList)[
                    e.target.value
                  ].paymentchannelid
                );
              }}
            >
              <option disabled value="">
                {i18n.t("withdrawal.msgEnterBank")}
              </option>
              {this.handleFilterCardList(this.props.wallet.bankCardList).map(
                (item, index) => {
                  return (
                    <option
                      key={index}
                      value={index}
                      id={`optionValue-${index}`}
                    >
                      {item.banktype} (
                      {item.detail.address ||
                        item.detail.bankAccount ||
                        item.detail.phone}
                      )
                    </option>
                  );
                }
              )}
            </Select>
          </FormControl>
        </ItemContainer>
        {/*請輸入提款金額*/}
        <ItemContainer>
          <LabelContainer>{i18n.t("common.amount")}</LabelContainer>
          <FormControl variant="outlined">
            <TextField
              fullWidth
              value={this.state.amount}
              onChange={this.handleChangeAmount}
              type={"number"}
              placeholder={
                this.state.selectedBankCardIndex
                  ? i18n.t("withdrawal.enterAmount") +
                    ` (${Common.formatNumberWithThousand(
                      this.state.min
                    )} - ${Common.formatNumberWithThousand(this.state.max)})`
                  : i18n.t("withdrawal.enterAmount")
              }
            />
          </FormControl>
        </ItemContainer>
        {/*金额 USDT*/}
        {this.handleFilterCardList(this.props.wallet.bankCardList)[
          this.state.selectedBankCardIndex
        ] &&
          this.handleFilterCardList(this.props.wallet.bankCardList)[
            this.state.selectedBankCardIndex
          ].banktype === "Usdt" && (
            <ItemContainer>
              <LabelContainer>{i18n.t("withdrawal.usdtAmount")}</LabelContainer>
              <TextField
                value={
                  isNaN(this.state.amount) === false
                    ? (this.state.amount * this.state.exchangeRate).toFixed(2)
                    : 0
                }
                type={"number"}
                disabled={true}
              />
            </ItemContainer>
          )}
        }{/*玩家備註*/}
        {config.features.Deposit_Withdrawal_PlayerNote &&
          this.handleFilterCardList(this.props.wallet.bankCardList)[
            this.state.selectedBankCardIndex
          ] &&
          (this.handleFilterCardList(this.props.wallet.bankCardList)[
            this.state.selectedBankCardIndex
          ].banktype.toUpperCase() === "BANK" ||
            this.handleFilterCardList(this.props.wallet.bankCardList)[
              this.state.selectedBankCardIndex
            ].banktype.toUpperCase() === "EWALLET" ||
            this.handleFilterCardList(this.props.wallet.bankCardList)[
              this.state.selectedBankCardIndex
            ].banktype.toUpperCase() === "PULSA") && (
            <Textbox
              style={{ margin: "50px auto 20px auto" }}
              value={this.state.playerNote}
              onChange={this.handlePlayerNoteChange}
              placeholder={i18n.t("withdrawal.plsEnterPlayerNote")}
              label={i18n.t("withdrawal.playerNote")}
            />
          )}
        {/*此银行卡的开户名必须与您账号所填写真实姓名一致，否则提款可能失败*/}
        <Remark>{i18n.t("withdrawal.notice")}</Remark>
        {/*提交*/}
        <Button
          onClick={this.handleSubmitClick}
          variant={"contained"}
          color={"primary"}
          fullWidth
          disabled={
            isNaN(parseFloat(this.state.amount.toString().replace(/,/g, ""))) ||
            parseFloat(this.state.amount.toString().replace(/,/g, "")) <
              this.state.min ||
            parseFloat(this.state.amount.toString().replace(/,/g, "")) >
              this.state.max ||
            this.state.disabled === true
          }
        >
          {i18n.t("common.submit")}
        </Button>
        <StyledModalBank
          onClose={() => this.setState({ ...this.state, bankOpen: false })}
          open={this.state.bankOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {this.handleFilterCardList(this.props.wallet.bankCardList).map(
            (item, index) => {
              return (
                <StyledListItem
                  button
                  key={index}
                  onClick={() => this.handleBankClick(index)}
                >
                  <LeftText primary={item.banktype}></LeftText>
                  <RightText
                    primary={
                      item.detail.address ||
                      item.detail.bankAccount ||
                      item.detail.phone
                    }
                  ></RightText>
                </StyledListItem>
              );
            }
          )}
        </StyledModalBank>
        <StyledModalPopup
          onClose={() => this.setState({ ...this.state, otp: false })}
          open={this.state.otp}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Button
            style={{
              width: "250px",
              float: "left",

              backgroundImage: "none",
              backgroundColor: "#b7b7b7",
            }}
            labelStyle={{ color: "#fff" }}
            label={i18n.t("common.cancel")}
            onClick={() => this.setState({ ...this.state, otp: false })}
          />
          <Button
            style={{
              width: "250px",
              float: "right",
            }}
            label={i18n.t("common.confirm")}
            onClick={this.handleConfirmOTP}
          />
        </StyledModalPopup>
        <Loading show={this.state.loading || this.props.wallet.loading} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    addBilling: (card_id, amount) =>
      dispatch(walletAction.addBilling(card_id, amount)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    doWithdraw: (amount, password, user_account_id, playerNote) =>
      dispatch(
        walletAction.doWithdraw(amount, user_account_id, password, playerNote)
      ),
    performWithdrawFromEveryBrand: () =>
      dispatch(walletAction.performWithdrawFromEveryBrand()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WithdrawalPrev));
