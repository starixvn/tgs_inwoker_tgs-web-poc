import React, { Component } from "react";
import { connect } from "react-redux";
import BottomScrollListener from "react-bottom-scroll-listener";

import { accountAction } from "@/api-services/actions/accountAction";
import { inboxAction } from "@/api-services/actions/inboxAction";
import Header from "@/components/Mobile/components/_PrevShare/Header";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";
import i18n from "@/utils/i18n";

import InboxList from "./InboxList";

class Inbox extends Component {
  state = {
    edit: false,
    limit: 10,
    page: 0,
    isBottom: false,
    selected: [],
    selectedGuid: [],
    loading: false,
    inbox: "",
    view: false,
  };

  componentDidMount() {
    if (this.props.token != null) {
      this.getMessageList(0, true);
    }
  }
  componentDidUpdate(preProps) {
    // if (preProps.token == null && this.props.token != null) {
    //   this.getMessageList(0);
    // }
  }
  getMessageList = (page, isNew = false) => {
    this.props.getMessages(i18n.language, this.state.limit, page + 1, isNew);
  };
  handleScrollBottom = () => {
    if (this.state.isBottom === false) {
      if (this.props.inbox.items.length < this.props.inbox.totalcount) {
        this.getMessageList(this.state.page + 1);
        this.setState({ ...this.state, page: this.state.page + 1 });
      }
    }
  };
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleEditClick = () => {
    if (this.props.inbox.items.length > 0) {
      this.setState({ ...this.state, edit: !this.state.edit });
    }
  };
  handleItemClick = (id) => {
    if (this.state.edit === false) {
      this.props.setMessageRead([id]).then((response) => {
        this.props.getMessages(i18n.language, 1, 99, true, true);
      });

      this.setState({
        ...this.state,
        view: true,
      });
    }
  };
  handleCheckboxClick = (SubjectID, GUID) => {
    let selected = this.state.selected;
    let selectedGuid = this.state.selectedGuid;
    if (this.state.selected.includes(SubjectID)) {
      selected = selected.filter((item) => item !== SubjectID);
      selectedGuid = selectedGuid.filter((item) => item !== GUID);
    } else {
      selected = selected.concat(SubjectID);
      selectedGuid = selectedGuid.concat(GUID);
    }
    this.setState({
      ...this.state,
      selected: selected,
      selectedGuid: selectedGuid,
    });
  };

  render() {
    return (
      <div style={{ paddingBottom: this.state.edit ? 120 : 0 }}>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("inbox.title")}
        ></Header>
        {this.props.inbox
          ? this.props.inbox.items.map((row, index) => {
              return (
                <InboxList
                  row={row}
                  index={index}
                  selected={this.state.selected}
                  edit={this.state.edit}
                  handleCheckboxClick={this.handleCheckboxClick}
                  handleItemClick={this.handleItemClick}
                />
              );
            })
          : ""}
        <BottomScrollListener onBottom={this.handleScrollBottom} />
        <Loading show={this.state.loading}></Loading>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    inbox: state.account.inbox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (language, limit, page, isNew, getCount = false) =>
      dispatch(inboxAction.getMessages(language, page, limit, isNew, getCount)),
    dispatch: dispatch,
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    setMessageRead: (ids) => dispatch(inboxAction.setMessageRead(ids)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
