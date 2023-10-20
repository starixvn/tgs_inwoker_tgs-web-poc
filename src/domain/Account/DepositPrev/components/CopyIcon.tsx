import React from "react";
import i18n from "@/utils/i18n";
import { utility } from "@/utils/utility";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import Icon from "@/components/Icon";
import copyImg from "@/assets/images/deposit/copy.png";
import styled from "styled-components";

const CopyIconContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;

  transition: all ease-in-out 0.2s;
  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: white;
  }
`;

type Props = {
  copyContent: any;
};
const CopyIcon = ({ copyContent }: Props) => {
  const { alert } = useNotifications();

  const performCopy = (content) => {
    alert("", i18n.t("affiliate.copied"));

    utility.copy(content);
  };

  return (
    <CopyIconContainer
      onClick={() => {
        performCopy(copyContent);
      }}
    >
      <Icon iconUrl={copyImg} width={"20px"} height={"20px"} />
    </CopyIconContainer>
  );
};

export default CopyIcon;
