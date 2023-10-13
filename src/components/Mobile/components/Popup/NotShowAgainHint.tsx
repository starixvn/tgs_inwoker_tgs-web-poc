import IconCheckBox from "@/assets/images/checkbox.svg";
import styled from "styled-components";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const NotShowAgainHintContainer = styled.div`
  background: ${theme.primaryLight};
  width: 171px;
  height: 38px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: calc(50% + 149px);
  z-index: 99;
  color: #ffffff;
  border-radius: 50px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
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
  border: ${(props) => (props.isCheck ? "0" : "1px")} solid #ffffff;
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
