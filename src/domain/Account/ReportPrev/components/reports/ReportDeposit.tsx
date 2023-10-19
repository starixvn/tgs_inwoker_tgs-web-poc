import React, { useEffect, useState } from "react";
import i18n from "@/utils/i18n";
import NoRecord from "@/domain/Account/ReportPrev/components/NoRecord";
import moment from "moment/moment";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
  ReportContainer,
} from "@/domain/Account/ReportPrev/styles";
import { Button } from "@/components/UI/Button";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { ReportService } from "@/services/ReportService";
import Loading from "@/components/UI/Loading";
import { useDepositStatus } from "@/domain/Account/ReportPrev/hooks/useDepositStatus";
import StatusSelect from "@/domain/Account/ReportPrev/components/StatusSelect";
import { DateRangeInfo } from "@/domain/Account/ReportPrev/hooks/useDateRange";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportDeposit = ({ dateRangeInfo }: Props) => {
  const history = useHistory();

  const handleManualDeposit = (id: string) => {
    history.push({
      pathname: "/manual/" + id,
    });
  };

  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [dataList, setDataList] = useState<any[]>([]);
  const [isMaxPage, setIsMaxPage] = useState(false);

  const { statusDictionary, status, handleStatusChange } = useDepositStatus();

  const fetchReports = async () => {
    setIsLoading(true);

    ReportService.GetDepositDetails(
      status,
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        const newDataList =
          page > 1 ? dataList.concat(response.data.items) : response.data.items;

        setDataList(newDataList);
        setIsLoading(false);
        setIsMaxPage(response.data.totalCount == newDataList.length);
      } else {
        alert("", response?.info || JSON.stringify(response));
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    setPage(1);
    setIsMaxPage(false);
    fetchReports();
  }, [JSON.stringify(dateRangeInfo), status]);

  const handleLoadMore = async () => {
    if (isMaxPage) return;

    setPage((prevState) => prevState++);
    await fetchReports();
  };

  return (
    <>
      <StatusSelect
        statusDictionary={statusDictionary}
        status={status}
        handleStatusChange={handleStatusChange}
      />
      <ReportContainer>
        {(() => {
          if (dataList.length <= 0) {
            return <NoRecord />;
          } else {
            return (
              <ReportCardsContainer>
                {dataList.map((row, index) => {
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
                          {row.status === 1 && row.canuploadcerts === true && (
                            <Button
                              onClick={() => {
                                handleManualDeposit(row.id);
                              }}
                            >
                              {i18n.t("deposit.uploadReceipt")}
                            </Button>
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
        <Loading show={isLoading} />
      </ReportContainer>
    </>
  );
};

export default ReportDeposit;
