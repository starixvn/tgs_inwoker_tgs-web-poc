import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import { accountAction } from "@/api-services/actions/accountAction";
import Loading from "@/components/Mobile/components/UI/Loading";
import ReportTypeTabs from "@/components/_Share_Domain/Account/ReportPrev/components/ReportTypeTabs";
import DateRangeWithDatePicker from "@/components/_Share_Domain/Account/ReportPrev/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/components/_Share_Domain/Account/ReportPrev/components/DateRangeWithIntervalSelector";
import ReportBetting from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportBetting";
import ReportWithdraw from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportWithdraw";
import ReportDeposit from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportDeposit";
import ReportRebate from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportRebate";
import ReportTransfer from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportTransfer";
import ReportJoinPromotion from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportJoinPromotion";
import ReportBalanceChange from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportBalanceChange";
import ReportPlatform from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportPlatform";

const Container = styled.div`
  width: 100%;
`;

class Report extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    this.state = {
      selectedType:
        this.props.match.params.tab &&
        parseInt(this.props.match.params.tab) > 0 &&
        parseInt(this.props.match.params.tab) <= 8
          ? parseInt(this.props.match.params.tab)
          : 2,
      loading: false,

      dateFrom: today,
      dateTo: today,

      dateRange: 0,
      pageSize: 20,
      page: 1,
      type: 0,
      status: "",
      betType: 0,
      betType2: 0,
      gameList: [],
      isMaxPage: false,
    };
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleChangeTab = (e, newValue) => {
    if (this.state.selectedType !== newValue) {
      window.scrollTo({ top: 0 });
      this.setState({
        ...this.state,
        selectedType: newValue,
      });
    }
  };

  handleDateRangeChange = (dateRangeEnum) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let newDateFrom = today;

    switch (dateRangeEnum) {
      // today
      case 0:
        break;

      // weekly
      case 1:
        newDateFrom = addDays(today, -7);
        break;

      // monthly
      case 2:
        newDateFrom = addMonths(today, -1);
        break;
    }

    this.setState({
      ...this.state,
      dateFrom: newDateFrom,
      dateTo: today,
      dateRange: dateRangeEnum,
      isMaxPage: false,
      page: 1,
    });
  };

  handleDateFromChange = (e) => {
    this.setState({ ...this.state, dateFrom: e });
  };

  handleDateToChange = (e) => {
    this.setState({ ...this.state, dateTo: e });
  };

  render() {
    const tabData = {
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
      type: this.state.type,
      dateRange: this.state.dateRange,
    };

    return (
      <Container>
        <ReportTypeTabs
          selectedType={this.state.selectedType}
          handleChangeTab={this.handleChangeTab}
          style={{ marginBottom: "20px" }}
        />
        <DateRangeWithDatePicker
          dateFrom={this.state.dateFrom}
          handleDateFromChange={this.handleDateFromChange}
          dateTo={this.state.dateTo}
          handleDateToChange={this.handleDateToChange}
          selectedType={this.state.selectedType}
          style={{ marginBottom: "16px" }}
        />
        <DateRangeWithIntervalSelector
          dateRange={this.state.dateRange}
          handleDateRangeChange={this.handleDateRangeChange}
        />

        {/* Main content */}
        {(() => {
          if (this.state.selectedType === 1) {
            return <ReportPlatform tabData={tabData} />;
          } else if (this.state.selectedType === 2) {
            return <ReportBetting tabData={tabData} />;
          } else if (this.state.selectedType === 3) {
            return <ReportWithdraw tabData={tabData} />;
          } else if (this.state.selectedType === 4) {
            return <ReportDeposit tabData={tabData} />;
          } else if (this.state.selectedType === 5) {
            return <ReportRebate tabData={tabData} />;
          } else if (this.state.selectedType === 6) {
            return <ReportTransfer tabData={tabData} />;
          } else if (this.state.selectedType === 7) {
            return <ReportJoinPromotion tabData={tabData} />;
          } else if (this.state.selectedType === 8) {
            return <ReportBalanceChange tabData={tabData} />;
          }
        })()}
        <Loading show={this.state.loading} />
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Report));
