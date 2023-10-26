import styled from "styled-components";
import avatarImg from "@/assets/t18/images/account/avatar.png";

const AvatarLevelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #596578;
  text-align: center;
`;
const AvatarContainer = styled.div`
  width: 73.5px
  height: 66.44px
  background: url(${avatarImg}) no-repeat center center;
  background-size: cover;
`;
const AvatarName = styled.h3`
  font-size: 1.2rem;
  margin-top: 10px;
`;
const AvatarLevel = ({ level }: { level: string }) => {
  return (
    <AvatarLevelContainer>
      <AvatarContainer />
      <AvatarName>Tony</AvatarName>
    </AvatarLevelContainer>
  );
};

export default AvatarLevel;
