import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore"; // Import the RootState type

const Content = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.0025rem;
  text-align: center;
  color: ${({ theme }) => theme.white};
`;

const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.yellow};
  text-decoration: none;
`;

const LabelNormal = styled.span`
  color: ${({ theme }) => theme.yellow};
  text-decoration: none;
`;

type Props = {
  text1?: string;
  text2?: string;
  link?: string;
  empty?: boolean;
  toEdit?: () => void;
};

const BottomNote = ({ empty, text1, toEdit, link, text2 }: Props) => {
  const { account } = useAccountStore();
  const { general } = useGeneralStore();

  const GetSupportUrl = (
    userid: string,
    name: string,
    question: string,
    email: string
  ) => {
    const newURL = general.livechat
      ? general.livechat.setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "")
      : "";

    if (newURL.length) {
      window.open(newURL, "_blank");
    } else {
      // Handle the case where newURL is empty
    }
  };

  const handleCSClick = () => {
    if (account.token == null) {
      GetSupportUrl("", "", "", "");
    } else {
      GetSupportUrl(
        "",
        account.info.member_username,
        "",
        account.info.member_email || ""
      );
    }
  };

  if (empty) return null;

  return (
    <Content>
      {text1 || i18n.t("share.bottomNote.pleaseContact")}{" "}
      {(() => {
        if (toEdit) {
          return (
            <LabelNormal onClick={toEdit}>
              {text2 || i18n.t("share.bottomNote.liveChat")}
            </LabelNormal>
          );
        } else if (link) {
          return (
            <LabelLink to={link}>
              {text2 || i18n.t("share.bottomNote.liveChat")}
            </LabelLink>
          );
        } else {
          return (
            <LabelNormal onClick={handleCSClick}>
              {text2 || i18n.t("share.bottomNote.liveChat")}
            </LabelNormal>
          );
        }
      })()}
    </Content>
  );
};

export default BottomNote;
