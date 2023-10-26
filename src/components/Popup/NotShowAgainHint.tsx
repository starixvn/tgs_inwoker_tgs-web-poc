import IconCheckBox from "@/assets/t18/images/checkbox.svg";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const NotShowAgainHintContainer = styled.div`
  background: ${({ theme }) => theme.primaryLight};
  width: 171px;
  height: 38px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 99;
  color: #ffffff;
  border-radius: 50px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 13px;
`;

type CheckBoxProps = {
  $isCheck: boolean;
};
const CheckBox = styled.div<CheckBoxProps>`
  width: 18px;
  height: 18px;
  background: ${(props: CheckBoxProps) =>
    props.$isCheck ? `url(${IconCheckBox}) no-repeat center center;` : null};
  margin-right: 10px;
  border: ${(props) => (props.$isCheck ? "0" : "1px")} solid #ffffff;
  border-radius: 5px;
`;

const NotShowAgainHint = ({
  onClick,
  isCheck,
  ...others
}: {
  onClick: () => void;
  isCheck: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <NotShowAgainHintContainer onClick={onClick} {...others}>
      <CheckBox $isCheck={isCheck} />
      Don't show again
    </NotShowAgainHintContainer>
  );
};

export default NotShowAgainHint;
