import styled from "styled-components";
import Marquee from "../Marquee";
import OnlineUser from "../OnlineUser";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 10px;
`;

const CardPromptContainer = () => {
  return (
    <Container>
      <Marquee />
      <OnlineUser />
    </Container>
  );
};

export default CardPromptContainer;
