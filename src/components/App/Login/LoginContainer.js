import IconLoginClosePNG from "@/assets/images/icon-login-close.png";
import LoginBGPNG from "@/assets/images/login-bg.png";
import styled from "styled-components";

const Container = styled.div`
  width: 506px;
  background: url(${LoginBGPNG});
  background-attachment: fixed;
  background-position: center;
  display: table;
`;

const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;

const LoginContainer = ({
  children,
  onhandleClose
}) => {
  return (
    <Container>
      <CloseIconContainer
      viewBox="4 4 16 16"
      onClick={onhandleClose}
      ></CloseIconContainer>
        {children}
    </Container>
  )
}

export default LoginContainer;