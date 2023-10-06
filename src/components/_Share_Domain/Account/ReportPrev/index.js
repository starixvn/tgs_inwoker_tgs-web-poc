import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import BottomScrollListener from "react-bottom-scroll-listener";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import FormControl from "@material-ui/core/FormControl";

import { ReportService } from "@/api-services/services/ReportService";
import { accountAction } from "@/api-services/actions/accountAction";
import { GeneralService } from "@/api-services/services/GeneralService";
import Loading from "@/components/Mobile/components/_PrevShare/Loading";
import i18n from "@/utils/i18n";
import config from "@/config/config";
import ErrorSwitcher from "@/utils/ErrorSwitcher";
import ReportTypeTabs from "@/components/_Share_Domain/Account/ReportPrev/components/ReportTypeTabs";
import DateRangeWithDatePicker from "@/components/_Share_Domain/Account/ReportPrev/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/components/_Share_Domain/Account/ReportPrev/components/DateRangeWithIntervalSelector";
import NoRecord from "@/components/_Share_Domain/Account/ReportPrev/components/NoRecord";
import { themeList } from "@/theme";
import { Select } from "@/components/Mobile/components/UI/Select";

const theme = themeList["mobileT18"];

const moment = require("moment");

const Container = styled.div`
  width: 100%;
`;

const ReportContainer = styled.div``;

const ReportSummary = styled.div`
  font-size: 0.8rem;
  color: ${theme.white};
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ReportSummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ReportSummaryCol = styled.div``;

const ReportCardsContainer = styled.div`
  font-size: 0.8rem;
  color: ${theme.white};
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ReportCard = styled.div`
  padding: 8px;
  font-size: 0.8rem;
  color: ${theme.white};
  background: ${theme.tertiaryDark};
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ReportCardRow = styled.div`
  width: 100%;
  min-height: 40px;
  font-weight: 600;
`;
const ReportCardCol = styled.span`
  font-weight: normal;
`;

const DataRow = styled.div`
  border-bottom: 2px solid #d7d7d7;
  width: 100%;
  min-height: 78px;
  padding: 20px 0;
`;

const DataDateCellAmount = styled.div`
  float: left;
  width: calc(100% / 3 * 1);
  text-align: right;
`;
const DataDateCell = styled.div`
  float: left;
  width: calc(100% / 4 * 1);
  text-align: left;
`;

const CustomSelect = withStyles((theme) => ({
  root: {
    height: "50px",
    padding: 0,
    margin: 0,
  },
}))(Select);

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

const TheDepositButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  padding: 0px 10px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const CustomWinLose = styled.span`
  color: ${({ value }) => {
    return value === 0 ? "" : value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
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

      tab1: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        type: 0,
      },
      tab2: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        roundTotal: {},
        type: 0,
      },
      tab3: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        status: "",
      },
      tab4: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        status: "",
      },
      tab5: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab6: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab7: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab8: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },

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

    if (this.state.selectedType === 1) {
      this.handleAccountGetReportTrigger(this.state.page, this.state.type);
    } else if (this.state.selectedType === 2) {
      this.handleTransactionGetReportTrigger(this.state.page, this.state.type);
    } else if (this.state.selectedType === 3) {
      this.handleWithdrawalGetReportTrigger(this.state.page, this.state.status);
    } else if (this.state.selectedType === 4) {
      this.handleDepositGetReportTrigger(this.state.page, this.state.status);
    } else if (this.state.selectedType === 5) {
      this.handleRebateGetReportTrigger(this.state.page);
    } else if (this.state.selectedType === 6) {
      this.handleGetTransferReportTrigger(this.state.page);
    } else if (this.state.selectedType === 7) {
      this.handleGetJoinedPromo(this.state.page);
    } else if (this.state.selectedType === 8) {
      this.handleBalanceChanges(this.state.page);
    }
  }
  componentDidUpdate(preProps, preState) {
    if (this.state.selectedType === 1) {
      if (
        preState.type !== this.state.type ||
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleAccountGetReportTrigger(this.state.page, this.state.type);
      }
    } else if (this.state.selectedType === 2) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.type !== this.state.type ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleTransactionGetReportTrigger(
          this.state.page,
          this.state.type
        );
      }
    } else if (this.state.selectedType === 3) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleWithdrawalGetReportTrigger(
          this.state.page,
          this.state.status
        );
      }
    } else if (this.state.selectedType === 4) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleDepositGetReportTrigger(this.state.page, this.state.status);
      }
    } else if (this.state.selectedType === 5) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleRebateGetReportTrigger(this.state.page);
      }
    } else if (this.state.selectedType === 6) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleGetTransferReportTrigger(this.state.page);
      }
    } else if (this.state.selectedType === 7) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleGetJoinedPromo(this.state.page);
      }
    } else if (this.state.selectedType === 8) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleBalanceChanges(this.state.page);
      }
    }
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
    let json = {};
    let setDateJson = {};

    if (this.state.selectedType !== newValue) {
      if (this.state.selectedType === 1) {
        json = {
          tab1: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            type: this.state.type,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 2) {
        json = {
          tab2: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            type: this.state.type,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 3) {
        json = {
          tab3: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            status: this.state.status,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 4) {
        json = {
          tab4: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            status: this.state.status,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 5) {
        json = {
          tab5: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 6) {
        json = {
          tab6: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 7) {
        json = {
          tab7: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 8) {
        json = {
          tab8: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      }
      if (newValue === 1) {
        setDateJson = {
          dateFrom: this.state.tab1.dateFrom,
          dateTo: this.state.tab1.dateTo,
          type: this.state.tab1.type,
          dateRange: this.state.tab1.dateRange,
        };
      } else if (newValue === 2) {
        setDateJson = {
          dateFrom: this.state.tab2.dateFrom,
          dateTo: this.state.tab2.dateTo,
          type: this.state.tab2.type,
          dateRange: this.state.tab1.dateRange,
        };
      } else if (newValue === 3) {
        setDateJson = {
          dateFrom: this.state.tab3.dateFrom,
          dateTo: this.state.tab3.dateTo,
          status: this.state.tab3.status,
          dateRange: this.state.tab3.dateRange,
        };
      } else if (newValue === 4) {
        setDateJson = {
          dateFrom: this.state.tab4.dateFrom,
          dateTo: this.state.tab4.dateTo,
          status: this.state.tab4.status,
          dateRange: this.state.tab4.dateRange,
        };
      } else if (newValue === 5) {
        setDateJson = {
          dateFrom: this.state.tab5.dateFrom,
          dateTo: this.state.tab5.dateTo,
          dateRange: this.state.tab5.dateRange,
        };
      } else if (newValue === 6) {
        setDateJson = {
          dateFrom: this.state.tab6.dateFrom,
          dateTo: this.state.tab6.dateTo,
          dateRange: this.state.tab6.dateRange,
        };
      } else if (newValue === 7) {
        setDateJson = {
          dateFrom: this.state.tab6.dateFrom,
          dateTo: this.state.tab6.dateTo,
          dateRange: this.state.tab6.dateRange,
        };
      } else if (newValue === 8) {
        setDateJson = {
          dateFrom: this.state.tab8.dateFrom,
          dateTo: this.state.tab8.dateTo,
          dateRange: this.state.tab8.dateRange,
        };
      }
      window.scrollTo({ top: 0 });
      this.setState({
        ...this.state,
        dataList: [],
        selectedType: newValue,
        page: 1,
        ...setDateJson,
        ...json,
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

  handleAccountGetReportTrigger = (page, type) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetAccountDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,

      type
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleTransactionGetReportTrigger = (page, game_platform_id) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetTransactionDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });

    config.features.Report_ShowRoundsTotal &&
      ReportService.GetRoundsTotal(
        moment(this.state.dateFrom).utc().format(),
        moment(this.state.dateTo).utc().add(1, "days").format()
      ).then((result) => {
        if (result.IsSuccess) {
          this.setState({
            ...this.state,
            tab2: {
              ...this.state.tab2,
              roundTotal: result.data,
            },
          });
        }
      });
  };
  handleWithdrawalGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetWithdrawalDetails(
      status,
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleDepositGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetDepositDetails(
      status,
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleRebateGetReportTrigger = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetRebateDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleGetTransferReportTrigger = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetTransferReport(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      1,
      true,
      "BalanceTime",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleGetJoinedPromo = (page) => {
    this.setState({ ...this.state, loading: true });
    GeneralService.GetJoinedPromoReport(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      false,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleBalanceChanges = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetBalanceChanges(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalcount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleTypeChange = (e) => {
    this.setState({ ...this.state, type: e.target.value, page: 1 });
  };
  handleStatusChange = (e) => {
    this.setState({ ...this.state, status: e.target.value, page: 1 });
  };

  handleScrollBottom = () => {
    console.log("handleScrollBottom");
    if (this.state.isMaxPage === false) {
      this.setState({
        ...this.state,
        page: this.state.page + 1,
        loading: true,
      });
    }
  };

  handleManualDeposit = (id) => {
    this.props.appHistory.push({
      pathname: "/manual/" + id,
    });
  };

  render() {
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
                  <CustomSelect
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
                  </CustomSelect>
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
              <ReportContainer>
                <ReportSummary>
                  <ReportSummaryRow>
                    <ReportSummaryCol>
                      {i18n.t("report.submitDate")}
                    </ReportSummaryCol>
                    <ReportSummaryCol>
                      {i18n.t("report.status")}
                    </ReportSummaryCol>
                    <ReportSummaryCol>
                      {i18n.t("report.transferOut")}
                      <br />
                      {i18n.t("report.transferIn")}
                    </ReportSummaryCol>

                    <ReportSummaryCol>
                      {i18n.t("common.amount")}
                    </ReportSummaryCol>
                  </ReportSummaryRow>
                </ReportSummary>

                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <ReportCard key={index}>
                              <ReportCardRow>
                                <ReportCardCol>
                                  {moment(row.create_time_text).format(
                                    "YYYY-MM-DD hh:mm a"
                                  )}
                                </ReportCardCol>
                                <ReportCardCol>{row.status_text}</ReportCardCol>
                                <ReportCardCol>
                                  {row.transform_out}
                                  <br />
                                  {row.transform_in}
                                </ReportCardCol>

                                <ReportCardCol>{row.amount_text}</ReportCardCol>
                              </ReportCardRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          } else if (this.state.selectedType === 2) {
            return (
              <ReportContainer>
                {config.features.Report_ShowRoundsTotal &&
                  this.state.tab2.roundTotal &&
                  (this.state.tab2.roundTotal.betAmount ||
                    this.state.tab2.roundTotal.validBetAmount ||
                    this.state.tab2.roundTotal.validBetAmount) && (
                    <ReportSummary>
                      <ReportSummaryRow>
                        <ReportSummaryCol>
                          {this.state.tab2.roundTotal &&
                            i18n.t("report.totalBetAmount") +
                              ": " +
                              this.state.tab2.roundTotal.betAmount}
                        </ReportSummaryCol>
                        <ReportSummaryCol>
                          {this.state.tab2.roundTotal &&
                            i18n.t("report.totalValidBet") +
                              ": " +
                              this.state.tab2.roundTotal.validBetAmount}
                        </ReportSummaryCol>
                        <ReportSummaryCol>
                          {i18n.t("report.totalWinLose") + ": "}
                          <CustomWinLose
                            value={
                              this.state.tab2.roundTotal &&
                              this.state.tab2.roundTotal.winLoss
                            }
                          >
                            {this.state.tab2.roundTotal &&
                              this.state.tab2.roundTotal.winLoss}
                          </CustomWinLose>
                        </ReportSummaryCol>
                      </ReportSummaryRow>
                    </ReportSummary>
                  )}

                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <ReportCard key={index}>
                              <ReportCardRow>
                                {i18n.t("report.betid")} :{" "}
                                <ReportCardCol>{row.id}</ReportCardCol>
                              </ReportCardRow>

                              <ReportCardRow>
                                <ReportCardCol>
                                  {config.features.WGHK_Setup
                                    ? row.subGameProviderName
                                    : row.gameProviderName
                                    ? row.gameProviderName === "BTI" &&
                                      config.currency === "PHP"
                                      ? "PHSB"
                                      : row.gameProviderName
                                    : ""}
                                  - {row.gameName}
                                </ReportCardCol>
                                <ReportCardCol> {date}</ReportCardCol>
                              </ReportCardRow>

                              <ReportCardRow>
                                <ReportCardCol>
                                  {i18n.t("report.betAmount")} :{row.betAmount}
                                </ReportCardCol>{" "}
                                <ReportCardCol>
                                  {i18n.t("report.validBet")} :
                                  {row.validBetAmount}
                                </ReportCardCol>{" "}
                                <ReportCardCol>
                                  {i18n.t("report.winloss")} :
                                  <CustomWinLose value={row.winLoss}>
                                    {row.winLoss}
                                  </CustomWinLose>
                                </ReportCardCol>
                              </ReportCardRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <ReportContainer>
                <ReportSummary>
                  <ReportSummaryRow>
                    <ReportSummaryCol>
                      {i18n.t("report.dateTime")}
                    </ReportSummaryCol>

                    <ReportSummaryCol>
                      {i18n.t("report.status")}
                    </ReportSummaryCol>
                    <DataDateCellAmount>
                      {i18n.t("common.amount")}
                    </DataDateCellAmount>
                  </ReportSummaryRow>
                </ReportSummary>

                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdon).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <ReportCard key={index}>
                              <ReportCardRow>
                                {i18n.t("report.NewOrderNumber")} :{" "}
                                <ReportCardCol>{row.orderno}</ReportCardCol>
                              </ReportCardRow>
                              <ReportCardRow>
                                <ReportCardCol>{date}</ReportCardCol>
                                <ReportCardCol>
                                  {i18n.t(
                                    `report.withdrawal.status${row.status}`
                                  )}
                                </ReportCardCol>
                                <ReportCardCol>{row.amount}</ReportCardCol>
                              </ReportCardRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <ReportContainer>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdon).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <ReportCard key={index}>
                              <ReportCardRow>
                                {i18n.t("report.NewOrderNumber")} :{" "}
                                <ReportCardCol>{row.orderno}</ReportCardCol>
                              </ReportCardRow>
                              <ReportCardRow>
                                <ReportCardCol>
                                  {i18n.t(`report.deposit.status${row.status}`)}
                                </ReportCardCol>
                                <ReportCardCol>{row.amount}</ReportCardCol>
                                <ReportCardCol>
                                  {row.status === 1 &&
                                    row.canuploadcerts === true && (
                                      <TheDepositButton
                                        onClick={() => {
                                          this.handleManualDeposit(row.id);
                                        }}
                                      >
                                        {i18n.t("deposit.uploadReceipt")}
                                      </TheDepositButton>
                                    )}
                                </ReportCardCol>
                                <ReportCardRow>
                                  <ReportCardCol>{date}</ReportCardCol>
                                </ReportCardRow>
                              </ReportCardRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          } else if (this.state.selectedType === 5) {
            return (
              <ReportContainer>
                <ReportSummary>
                  <ReportSummaryRow>
                    <ReportSummaryCol>
                      {i18n.t("report.rebate.sn")}
                    </ReportSummaryCol>
                    <ReportSummaryCol>
                      {i18n.t("report.rebate.cycleDate")}
                    </ReportSummaryCol>
                    <ReportSummaryCol>
                      {i18n.t("report.status")}
                    </ReportSummaryCol>
                    <ReportSummaryCol style={{ "text-align": "right" }}>
                      {i18n.t("report.rebate.validBet")}
                      <br />
                      {i18n.t("report.rebate.amount")}
                    </ReportSummaryCol>
                  </ReportSummaryRow>
                </ReportSummary>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <ReportCard key={index}>
                              <DataRow>
                                <DataDateCell>{row.sn}</DataDateCell>
                                <DataDateCell>{row.date}</DataDateCell>
                                <DataDateCell>{row.status_text}</DataDateCell>
                                <DataDateCell style={{ "text-align": "right" }}>
                                  {row.bet_valid_text}
                                  <br />
                                  {row.rebate_amount_text}
                                </DataDateCell>
                              </DataRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          } else if (this.state.selectedType === 6) {
            return (
              <ReportContainer>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <ReportCard key={index}>
                              <ReportCardRow>
                                {i18n.t("report.transfer.table.from")} :{" "}
                                <ReportCardCol>
                                  {row.from
                                    ? row.from === "BTI" &&
                                      config.currency === "PHP"
                                      ? "PHSB"
                                      : row.from
                                    : ""}
                                </ReportCardCol>
                              </ReportCardRow>
                              <ReportCardRow>
                                {i18n.t("report.transfer.table.to")} :{" "}
                                <ReportCardCol>
                                  {row.to
                                    ? row.to === "BTI" &&
                                      config.currency === "PHP"
                                      ? "PHSB"
                                      : row.to
                                    : ""}
                                </ReportCardCol>
                              </ReportCardRow>
                              <ReportCardRow>
                                {i18n.t("report.amount")} :{" "}
                                <ReportCardCol>{row.amount}</ReportCardCol>
                              </ReportCardRow>
                              <ReportCardRow>
                                <ReportCardCol>
                                  {moment(row.balancetime).format(
                                    "YYYY-MM-DD hh:mm a"
                                  )}
                                </ReportCardCol>
                              </ReportCardRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          } else if (this.state.selectedType === 7) {
            return (
              <ReportContainer>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.joinedOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <ReportCard key={index}>
                              <ReportCardRow>
                                <ReportCardCol>
                                  {i18n.t("report.dateTime")} :{" "}
                                </ReportCardCol>
                                <ReportCardCol>{date}</ReportCardCol>
                              </ReportCardRow>

                              <ReportCardRow>
                                <ReportCardCol>
                                  {i18n.t("report.joinedPromo.promoName")}:{" "}
                                </ReportCardCol>
                                <ReportCardCol>
                                  {row.promotionName}
                                </ReportCardCol>
                              </ReportCardRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          } else if (this.state.selectedType === 8) {
            return (
              <ReportContainer>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <ReportCardsContainer>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.recordedon).format(
                            "YYYY/MM/DD hh:mm:ss"
                          );
                          return (
                            <ReportCard key={index}>
                              <ReportCardRow>
                                <ReportCardCol>
                                  {i18n.t("report.dateTime")} :{" "}
                                </ReportCardCol>
                                <ReportCardCol>{date}</ReportCardCol>
                              </ReportCardRow>
                              <ReportCardRow>
                                <ReportCardCol>
                                  {i18n.t("report.balanceChanges.type")}:{" "}
                                </ReportCardCol>
                                <ReportCardCol>
                                  {ErrorSwitcher.getTranslation(row.type)}
                                </ReportCardCol>
                              </ReportCardRow>
                              <ReportCardRow>
                                <ReportCardCol>
                                  {i18n.t("report.balanceChanges.amount")}:{" "}
                                </ReportCardCol>
                                <ReportCardCol>{row.amount}</ReportCardCol>
                              </ReportCardRow>
                            </ReportCard>
                          );
                        })}
                      </ReportCardsContainer>
                    );
                  }
                })()}
              </ReportContainer>
            );
          }
        })()}
        {/*<BottomScrollListener onBottom={this.handleScrollBottom} offset={300} />*/}
        <Loading show={this.state.loading}></Loading>
        <BottomScrollListener
          onBottom={() => {
            console.log("FUCK");
          }}
          offset={300}
        />
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
