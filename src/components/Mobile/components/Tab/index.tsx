import styled from "styled-components";

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
  background-color: ${({ theme, $isActive }: Props) =>
    $isActive ? theme.primary : theme.primaryLight};
  margin-right: 12px;
  cursor: pointer;
  user-select: none;
`;

const Text = styled.div<{ $fontSize: string; $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.white : theme.tertiary};
  font-size: ${({ $fontSize }) =>
    $fontSize === "small" ? "0.875rem" : "0.6875rem"};
`;

const Tab = ({ imageUrl, text, isActive, fontSize, type, onClick }: Props) => {
  return (
    <Wrapper
      $isActive={isActive}
      $imageUrl={imageUrl}
      $text={text}
      onClick={onClick}
    >
      <img src={imageUrl} alt={text} />
      <Text $isActive={isActive} $fontSize={fontSize}>
        {text}
      </Text>
    </Wrapper>
  );
};

export default Tab;
