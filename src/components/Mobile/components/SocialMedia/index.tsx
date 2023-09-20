import styled from 'styled-components';
import { socialMediaIconList } from "../../constants/socialMedia";

const SocialMediaContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
`;

const SocialMediaIcon = styled.div<{ imageUrl: string }>`
    width: 38px;
    height: 38px;
    background-image: url(${(props) => props.imageUrl});
    background-size: cover;
    margin: 3px;
`;

const SocialMedia = () => {

    return (
        <SocialMediaContainer>
            {socialMediaIconList.map((item: string) => (
                <SocialMediaIcon key={item} imageUrl={item} />
            ))}
        </SocialMediaContainer>
    );
};

export default SocialMedia;