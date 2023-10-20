import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { walletAction } from "@/api-services/actions/walletAction";
import { RESET_WALLETRESULT } from "@/api-services/constant/actionType";
import Loading from "@/components/UI/Loading";
import i18n from "@/utils/i18n";
import { Button } from "@/components/UI/Button";
import TransferCard from "@/domain/Account/TransferPrev/components/TransferCard";
import AutoTransferSwitch from "@/domain/Account/TransferPrev/components/AutoTransferSwitch";
import WithdrawAllToMainWallet from "@/domain/Account/WithdrawalPrev/components/WithdrawAllToMainWallet";

const Container = styled.div`
  width: 100%;
  overflow: hidden;

  & > * {
    margin-bottom: 20px;
  }
`;

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferAmount: "",
      fromWallet: "0",
      toWallet: "0",
      loading: false,
      open: false,
      mainAccountId: "0",
      disabled: false,
    };
  }

  componentDidMount() {
    this.props.getBalanceList();
  }
  componentDidUpdate(preProps) {
    const isTransferResultChanged =
      preProps.wallet.transferResult !== this.props.wallet.transferResult &&
      this.props.wallet.transferResult !== null;
    if (isTransferResultChanged) {
      if (this.props.wallet.transferResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({
          transferAmount: "",
          fromWallet: 0,
          toWallet: "",
          loading: false,
          open: false,
        });
      } else {
        this.props.alert("", this.props.wallet.transferResult.info);
      }
    }

    const isWithdrawalAllResultChanged =
      preProps.wallet.withdrawalAllResult !==
        this.props.wallet.withdrawalAllResult &&
      this.props.wallet.withdrawalAllResult !== null;

    if (isWithdrawalAllResultChanged) {
      if (this.props.wallet.withdrawalAllResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({
          transferAmount: "",
          fromWallet: 0,
          toWallet: "",
          loading: false,
          open: false,
        });
      } else {
        this.props.alert("", this.props.wallet.withdrawalAllResult.info);
      }
    }
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handleSubmitClicked = (e) => {
    this.setState({ ...this.state, disabled: true });
    const transferFrom = this.state.fromWallet;
    const transferTo = this.state.toWallet;
    const transferAmount = this.state.transferAmount
      .toString()
      .replace(/,/g, "");
    const balance = this.props.wallet.mainBalance;

    if (
      parseFloat(transferAmount) > parseFloat(balance) &&
      transferFrom === this.state.mainAccountId
    ) {
      if (parseFloat(transferAmount) <= 0) {
        this.props.alert("", i18n.t("transfer.invalidAmount"));
      } else {
        this.props.alert("", i18n.t("transfer.insufficient"));
      }
    } else {
      if (transferFrom === this.state.mainAccountId)
        this.props.doTransfer(transferTo, transferAmount);
      else this.props.doWithdrawalFromGame(transferFrom, transferAmount);
    }
    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };
  transfer = (transferFrom, transferTo, transferAmount) => {
    this.props.doTransfer(
      transferAmount,
      this.state.mainAccountId,
      transferTo === this.state.mainAccountId ? transferFrom : transferTo,
      transferFrom === this.state.mainAccountId ? 1 : 2
    );
  };

  handleChangeFromWallet = (e) => {
    const fromWallet = e.target.value;

    if (fromWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        fromWallet: fromWallet,
        toWallet: this.state.mainAccountId,
      });
    } else {
      this.setState({
        ...this.state,
        fromWallet: fromWallet,
        toWallet: "",
      });
    }
  };
  handleToWallet = (e) => {
    const toWallet = e.target.value;

    if (toWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        fromWallet: this.state.mainAccountId,
        toWallet: toWallet,
      });
    } else {
      this.setState({
        ...this.state,
        fromWallet: this.state.mainAccountId,
        toWallet: toWallet,
      });
    }
  };
  handleTransferAmountChanged = (e) => {
    this.setState({ ...this.state, transferAmount: e.target.value });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    return (
      <Container>
        <TransferCard
          fromWallet={this.state.fromWallet}
          handleChangeFromWallet={this.handleChangeFromWallet}
          toWallet={this.state.toWallet}
          handleChangeToWallet={this.handleToWallet}
          transferAmount={this.state.transferAmount}
          handleChangeTransferAmount={this.handleTransferAmountChanged}
          mainAccountId={this.state.mainAccountId}
        >
          <Button
            onClick={this.handleSubmitClicked}
            variant={"contained"}
            color={"primary"}
            fullWidth
            disabled={
              this.state.transferAmount === 0 ||
              this.state.transferAmount === "" ||
              this.state.toWallet === this.state.fromWallet ||
              this.state.disabled === true
            }
          >
            {i18n.t("common.confirm")}
          </Button>
        </TransferCard>

        <WithdrawAllToMainWallet
          label={i18n.t("transfer.msgTransferOutFromGP")}
          buttonText={i18n.t("transfer.oneKeyTransferOut")}
        />

        <AutoTransferSwitch />

        <Loading
          show={
            this.state.loading ||
            this.props.wallet.loading ||
            this.props.wallet.transferLoading
          }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),

    doTransfer: (gpcode, amount) =>
      dispatch(walletAction.doTransfer(gpcode, amount)),
    doWithdrawalFromGame: (gpcode, amount) =>
      dispatch(walletAction.doWithdrawalFromGame(gpcode, amount)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Transfer));
