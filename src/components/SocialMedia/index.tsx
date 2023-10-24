import { useHistory } from "react-router";
import styled from "styled-components";
import { socialMediaIconList } from "../../constants/socialMedia";

const SocialMediaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  cursor: pointer;
`;

const SocialMediaIcon = styled.div<{ $imageUrl: string }>`
  width: 38px;
  height: 38px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
  margin: 3px;
`;

const SocialMedia = () => {
  const history = useHistory();
  const navigateToHomePage = () => {
    history.push("/");
  };

  return (
    <SocialMediaContainer onClick={navigateToHomePage}>
      {socialMediaIconList.map((item: string) => (
        <SocialMediaIcon key={item} $imageUrl={item} />
      ))}
    </SocialMediaContainer>
  );
};

export default SocialMedia;
