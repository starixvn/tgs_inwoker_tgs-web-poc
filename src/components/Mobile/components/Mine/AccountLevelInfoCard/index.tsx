import React, { useMemo } from "react";
import bgImg from "@/assets/images/account/account_level_bg.svg";
import styled from "styled-components";
import { themeList } from "@/theme";
import {
  Table as MuiTable,
  TableBody,
  TableCell as MuiTableCell,
  TableCellProps,
  TableHead,
  TableRow as MuiTableRow,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const theme = themeList["mobileT18"];

const InfoCardContainer = styled.div`
  background-image: url(${bgImg});
  padding: 24px 16px;
  color: ${theme.white};
  display: flex;
  justify-content: end;
`;

const LevelCard = styled.div`
  padding: 2px 3px;
  border-radius: 5px;
  color: ${theme.white};
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  line-height: 1rem;
`;

const StyledTable = styled(MuiTable)`
  width: 60%;
  color: ${theme.white};
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
`;
const StyledTableRow = styled(MuiTableRow)`
  height: 36px;
`;
const StyledTableCell = styled(MuiTableCell)<TableCellProps>`
  border-bottom: none;
  padding: 0;
  height: 36px !important;
  font-weight: 700;
  line-height: 1;
  min-width: 35px;
`;

interface LevelItem {
  label: string;
  key: string;
  current: {
    label: string;
    value: number;
  };
  next: {
    label: string;
    value: number;
  };
}

type AccountLevelInfoCardProps = {};
const AccountLevelInfoCard = (props: AccountLevelInfoCardProps) => {
  const levelItemList: LevelItem[] = useMemo(() => {
    return [
      {
        label: "In-House",
        key: "inHouse",
        current: {
          label: "V0",
          value: 0.2,
        },
        next: {
          label: "V1",
          value: 0.25,
        },
      },
      {
        label: "Slots",
        key: "slot1",
        current: {
          label: "V0",
          value: 0.2,
        },
        next: {
          label: "V1",
          value: 0.25,
        },
      },
      {
        label: "Live Casino",
        key: "livecasino",
        current: {
          label: "V0",
          value: 0.2,
        },
        next: {
          label: "V1",
          value: 0.25,
        },
      },
      {
        label: "Slots",
        key: "slot2",
        current: {
          label: "V0",
          value: 0.2,
        },
        next: {
          label: "V1",
          value: 0.25,
        },
      },
      {
        label: "Slots",
        key: "slot3",
        current: {
          label: "V0",
          value: 0.2,
        },
        next: {
          label: "V1",
          value: 0.25,
        },
      },
      {
        label: "Slots",
        key: "slot4",
        current: {
          label: "V0",
          value: 0.2,
        },
        next: {
          label: "V1",
          value: 0.25,
        },
      },
    ];
  }, []);
  return (
    <InfoCardContainer>
      <StyledTable>
        <TableHead>
          <MuiTableRow>
            <StyledTableCell />
            <StyledTableCell align={"center"}>
              <LevelCard
                style={{ background: theme.green }}
              >{`Current${levelItemList[0].current.label}`}</LevelCard>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align={"center"}>
              <LevelCard
                style={{ background: "#FF9A02" }}
              >{`Next${levelItemList[0].next.label}`}</LevelCard>
            </StyledTableCell>
          </MuiTableRow>
        </TableHead>

        <TableBody>
          {levelItemList.map((levelItem) => {
            const { key, label, current, next } = levelItem;
            return (
              <StyledTableRow key={key}>
                <StyledTableCell style={{ color: theme.white }}>
                  {label}
                </StyledTableCell>
                <StyledTableCell
                  style={{ color: theme.green }}
                  align={"center"}
                >
                  {current.value}%
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    color: theme.tertiary,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <NavigateNextIcon />
                </StyledTableCell>
                <StyledTableCell
                  style={{ color: theme.tertiary }}
                  align={"center"}
                >
                  {next.value}%
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </InfoCardContainer>
  );
};

export default AccountLevelInfoCard;
