import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const desktopActiveTabBgUrl =
  process.env.PUBLIC_URL + "assets/images/home/desktop_active_tab_bg.png";

type Props = {
  imageUrl: string;
  text: string;
  isActive: boolean;
  fontSize: "small" | "smaller" | string;
  type: number;
  onClick: () => void;
};

const Wrapper = styled.div<{
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
}>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 77px;
  border-radius: 12px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.primaryLight};
  margin-right: 12px;
  cursor: pointer;
  user-select: none;

  ${media.sm} {
    width: 112px;
    height: 32px;
    flex-direction: row;
    background-image: ${({ $isActive }) =>
      $isActive ? `url(${desktopActiveTabBgUrl})` : null};
  }
`;

const GameIcon = styled.img`
  width: 34px;
  height: 34px;

  ${media.sm} {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const Text = styled.div<{ $fontSize: string; $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.white : theme.tertiary};
  font-size: ${({ $fontSize }) =>
    $fontSize === "small" ? "0.875rem" : "0.6875rem"};
  font-weight: 700;
`;

const Tab = ({ imageUrl, text, isActive, fontSize, type, onClick }: Props) => {
  return (
    <Wrapper
      $isActive={isActive}
      $imageUrl={imageUrl}
      $text={text}
      onClick={onClick}
    >
      <GameIcon src={imageUrl} alt={text} />
      <Text $isActive={isActive} $fontSize={fontSize}>
        {text}
      </Text>
    </Wrapper>
  );
};

export default Tab;
