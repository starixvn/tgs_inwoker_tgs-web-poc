import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import FormControl from "@material-ui/core/FormControl";

import { ReportService } from "@/services/ReportService";
import { accountAction } from "@/api-services/actions/accountAction";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";
import i18n from "@/utils/i18n";
import ReportTypeTabs from "@/components/_Share_Domain/Account/ReportPrev/components/ReportTypeTabs";
import DateRangeWithDatePicker from "@/components/_Share_Domain/Account/ReportPrev/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/components/_Share_Domain/Account/ReportPrev/components/DateRangeWithIntervalSelector";
import { themeList } from "@/theme";
import { Select } from "@/components/Mobile/components/UI/Select";
import ReportBetting from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportBetting";
import ReportWithdraw from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportWithdraw";
import ReportDeposit from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportDeposit";
import ReportRebate from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportRebate";
import ReportTransfer from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportTransfer";
import ReportJoinPromotion from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportJoinPromotion";
import ReportBalanceChange from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportBalanceChange";
import ReportPlatform from "@/components/_Share_Domain/Account/ReportPrev/components/reports/ReportPlatform";

const theme = themeList["mobileT18"];

const Container = styled.div`
  width: 100%;
`;

const StatusSelectContainer = styled.div`
  padding: 15px 29px;
  background: ${theme.tertiaryDark};
  font-size: 0.937rem;
  color: ${theme.white};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SelectLabel = styled.div`
  margin-right: 80px;
`;

const SelectFormControl = withStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 0,
    "& fieldset": {
      border: "none",
    },

    "& select": {
      padding: 0,
      color: theme.white,
      fontSize: "0.937rem",
    },

    "& .MuiSvgIcon-root": {
      color: theme.tertiary,
    },
  },
}))(FormControl);

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
      dataList: [],
      gameList: [],
      isMaxPage: false,
      depositStatusList: {},
      withdrawalStatusList: {},
    };
  }

  componentDidMount() {
    this.GetDepositWithdrawalStatus();
  }

  GetDepositWithdrawalStatus = () => {
    ReportService.GetDepositStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, depositStatusList: response.data });
      }
    });
    ReportService.GetWithdrawalStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, withdrawalStatusList: response.data });
      }
    });
  };
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
      dataList: [],
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

  handleTypeChange = (e) => {
    this.setState({ ...this.state, type: e.target.value, page: 1 });
  };
  handleStatusChange = (e) => {
    this.setState({ ...this.state, status: e.target.value, page: 1 });
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
        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <StatusSelectContainer>
                <SelectLabel>{i18n.t("report.platform")}</SelectLabel>
                <SelectFormControl variant="outlined" style={{}}>
                  <Select
                    native
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                  >
                    <option value={0}>{i18n.t("report.all")}</option>

                    {(() => {
                      return this.state.gameList.map((row) => {
                        return (
                          <option value={row.id} key={row.id}>
                            {row.name}
                          </option>
                        );
                      });
                    })()}
                  </Select>
                </SelectFormControl>
              </StatusSelectContainer>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <StatusSelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>

                <SelectFormControl variant="outlined">
                  <Select
                    native
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                    fullWidth
                  >
                    <option value={""}>{i18n.t("report.all")}</option>

                    {Object.keys(this.state.withdrawalStatusList).map((key) => {
                      return (
                        <option key={key} value={key}>
                          {i18n.t(`report.withdrawal.status${key}`)}
                        </option>
                      );
                    })}
                  </Select>
                </SelectFormControl>
              </StatusSelectContainer>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <StatusSelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>
                <SelectFormControl variant="outlined">
                  <Select
                    native
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                  >
                    <option value={""}>{i18n.t("report.all")}</option>
                    {Object.keys(this.state.depositStatusList).map((key) => {
                      return (
                        <option key={key} value={key}>
                          {i18n.t(`report.deposit.status${key}`)}
                        </option>
                      );
                    })}
                  </Select>
                </SelectFormControl>
              </StatusSelectContainer>
            );
          }
        })()}

        {/* Main content */}
        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <ReportPlatform
                tabData={tabData}
                dataList={this.state.dataList}
              />
            );
          } else if (this.state.selectedType === 2) {
            return (
              <ReportBetting tabData={tabData} dataList={this.state.dataList} />
            );
          } else if (this.state.selectedType === 3) {
            return (
              <ReportWithdraw
                tabData={tabData}
                dataList={this.state.dataList}
              />
            );
          } else if (this.state.selectedType === 4) {
            return (
              <ReportDeposit tabData={tabData} dataList={this.state.dataList} />
            );
          } else if (this.state.selectedType === 5) {
            return (
              <ReportRebate tabData={tabData} dataList={this.state.dataList} />
            );
          } else if (this.state.selectedType === 6) {
            return (
              <ReportTransfer
                tabData={tabData}
                dataList={this.state.dataList}
              />
            );
          } else if (this.state.selectedType === 7) {
            return (
              <ReportJoinPromotion
                tabData={tabData}
                dataList={this.state.dataList}
              />
            );
          } else if (this.state.selectedType === 8) {
            return (
              <ReportBalanceChange
                tabData={tabData}
                dataList={this.state.dataList}
              />
            );
          }
        })()}
        <Loading show={this.state.loading}></Loading>
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
