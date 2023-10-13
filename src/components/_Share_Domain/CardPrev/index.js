import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { walletAction } from "@/api-services/actions/walletAction";
import { accountAction } from "@/api-services/actions/accountAction";
import { RESET_WALLETRESULT } from "@/api-services/constant/actionType";
import MessageDialog from "@/components/Mobile/components/_PrevShare/MessageDialog";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import AddCardsButton from "@/components/_Share_Domain/CardPrev/components/AddCardsButton";
import Card from "@/components/_Share_Domain/CardPrev/components/Card";

const Container = styled.div`
  width: 100%;
  padding: 20px 28px;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

class CardPrev extends Component {
  state = {
    loading: false,
    bankCardList: [],
    showDialog: false,
    dialogMessage: "",
  };
  componentDidMount() {
    if (this.props.wallet.bankCardList.length === 0) {
      this.props.getBankCardList();
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.deleteBankCardResult !==
        this.props.wallet.deleteBankCardResult &&
      this.props.wallet.deleteBankCardResult !== null
    ) {
      if (this.props.wallet.deleteBankCardResult.IsSuccess) {
        this.props.getBankCardList();
      } else {
        this.setState({
          ...this.state,
          showDialog: true,
          dialogMessage: this.props.wallet.deleteBankCardResult.info,
        });
      }
      this.props.resetResult();
    }
  }
  handleCloseDialog() {
    this.setState({
      ...this.state,
      showDialog: false,
      dialogMessage: "",
    });
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleDeleteCard = (e) => {
    if (
      this.props.wallet.bankCardList.length > 0 &&
      (config.features.ChangesNotAllowed ||
        config.features.AddCard_NotAllowedEditDelete ||
        config.features.AddCard_DisableCreateUpdateDelete)
    ) {
      this.props.alert("", i18n.t("card.toEdit"));

      this.props.getBankCardList();
    } else {
      this.props.deleteBankCard(e.item.id);
    }
  };
  render() {
    return (
      <Container>
        {this.props.wallet.bankCardList.map((row) => {
          return (
            <Card
              key={row.id}
              title={row.banktype}
              content={
                row.detail.address || row.detail.bankAccount || row.detail.phone
              }
              handleDelete={this.handleDeleteCard}
              disable={
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete
              }
            />
          );
        })}

        {!(
          config.features.AddCard_NotAllowedEditDelete ||
          config.features.ChangesNotAllowed ||
          (this.props.wallet.bankCardList.length >=
            config.features.AddCard_MaximumCardAllowed &&
            config.features.AddCard_DisableCreateUpdateDelete)
        ) && (
          <AddCardsButton
            handleClick={() => {
              this.props.wallet.bankCardList.length > 0 &&
              (config.features.ChangesNotAllowed ||
                config.features.AddCard_NotAllowedEditDelete ||
                this.props.wallet.bankCardList.length >=
                  config.features.AddCard_MaximumCardAllowed)
                ? this.props.alert("", i18n.t("card.toEdit"))
                : this.props.navigate("/card/add");
            }}
          />
        )}
        <MessageDialog
          onClose={() => this.handleCloseDialog()}
          open={this.state.showDialog}
          message={this.state.dialogMessage}
          onClick={() => this.handleCloseDialog()}
        />

        <Loading show={this.state.loading || this.props.wallet.loading} />
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardPrev);
