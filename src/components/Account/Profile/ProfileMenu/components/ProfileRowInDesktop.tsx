import { ProfileItem } from "@/hooks/account/useProfileMenu";
import { useTheme } from "@mui/material";
import { Button } from "@/components/UI/Button";
import React from "react";
import styled from "styled-components";

const ProfileItemContainer = styled.div`
  width: 100%;
  padding: 21px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .label {
    color: ${({ theme }) => theme.white};
    font-size: 1.25rem;
    font-weight: 400;
  }

  & .status {
    color: ${({ theme }) => theme.tertiary};
    font-size: 0.93rem;
    font-weight: 400;
  }

  & svg {
    color: ${({ theme }) => theme.tertiary} !important;
  }
`;

type Props = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInDesktop = ({ profileItem, handleClick }: Props) => {
  if (!profileItem) return null;
  const theme: any = useTheme();

  const { label, isVerified, status, buttonText } = profileItem;

  return (
    <ProfileItemContainer>
      <div className={"label"} style={{ width: "33%" }}>
        {label}
      </div>
      <div className={"status"} style={{ width: "33%" }}>
        {status}
      </div>

      <Button
        variant={isVerified ? "contained" : "outlined"}
        // color={isVerified ? "primary" : theme.palette.white}
        sx={{
          color: isVerified
            ? theme.palette.white
            : theme.palette.tertiary.light,
          width: "150px",
        }}
        onClick={() => {
          if (!profileItem) return;
          handleClick(profileItem);
        }}
      >
        {buttonText}
      </Button>
    </ProfileItemContainer>
  );
};

export default ProfileRowInDesktop;
