import React from "react";
import i18n from "@/utils/i18n";
import styled from "styled-components";

const NoRecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  width: 100px;
`;

const NoRecordContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/no-record.png`})
    no-repeat center;
  width: 96px;
  height: 136px;
`;

const NoDataText = styled.div`
  font-size: 24px;
  user-select: none;
  opacity: 0.5;
`;

type Props = {};
const NoRecord = (props: Props) => {
  return (
    <NoRecordWrapper>
      <NoRecordContainer language={i18n.language} />
      <NoDataText>{i18n.t("common.nodata")}</NoDataText>
    </NoRecordWrapper>
  );
};

export default NoRecord;
