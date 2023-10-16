import styled from "styled-components";

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Wrapper = styled.div<{ $text: string; $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 154px;
  height: 38px;
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.primary : theme.primaryLight};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.white : theme.tertiaryMiddle};
  font-weight: 500;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.white : theme.tertiary};
`;

const TabButton = ({ text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $text={text} onClick={onClick}>
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default TabButton;
