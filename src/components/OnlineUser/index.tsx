import styled from "styled-components";
import member from "@/assets/images/home/mobile/member.svg";
import useOnlineUser from "@/hooks/useOnlineUser";

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 0.875rem;
  background: ${(props: { theme: { primaryLight: any } }) =>
    props.theme.primaryLight};
  width: 120px;
`;

const Text = styled.div`
  color: ${(props: { theme: { white: any } }) => props.theme.white};
  margin-left: 7px;
`;

const OnlineUser = () => {
  const { onlineUser } = useOnlineUser();

  return (
    <Wrapper>
      <img src={member} alt="online member" />
      <Text>{onlineUser ? onlineUser : ""}</Text>
    </Wrapper>
  );
};

export default OnlineUser;
