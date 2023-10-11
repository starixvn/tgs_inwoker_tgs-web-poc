import bg from "@/assets/images/home/mobile/vender_card_bg.png";
import styled from 'styled-components';

type Props = {
  imageUrl: string;
  gameName?: string;
  venderName?: string;
  venderLogo?: string;
}

const CardVendorBg = styled.div`
    width: calc(33.33% - 10px);
    height: 158px; //to-do : dynamic heigh
    bottom: 0;
    background-image: url(${bg});
    background-size: cover;
    box-sizing: border-box;
    position: relative;
`;

const GameIcon = styled.div<{ imageUrl: string }>`
    width: 100%;
    padding-top: 91.5%;
    background-image: url(${(props) => props.imageUrl});
    background-size: cover;
    border-radius: 10px 10px 0 0;
`;

const GradientBg = styled.div`
    position: absolute;
    width: 100%;
    height: 60%;
    left: 0;
    bottom: 0;
    background:  ${(props) => props.theme.primaryGradient};
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
`;

const CardContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const GameName = styled.div`
   ${(props: { theme: { white: any; }; }) => props.theme.white};
   text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   font-size: 1.5rem;
   font-weight: 900;
   margin-bottom: 4px;
`;

const VenderName = styled.div`
    ${(props: { theme: { white: any; }; }) => props.theme.white};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 0.625rem;
    font-weight: 400;
`;

const VenderLogo = styled.div<Props>`
    display: inline-flex;
    width: 100%;
    max-width: 77px
    min-height: 38px;
    background-image: url(${props => props.imageUrl});
    background-size: contain;
    background-repeat: no-repeat;
`;

const CardVendor = ({ imageUrl, gameName, venderName, venderLogo }: Props) => {
  return (
    <CardVendorBg>
      <GameIcon imageUrl={imageUrl}></GameIcon>
      <GradientBg>
        <CardContent>
          {gameName && <GameName>{gameName}</GameName>}
          {venderName && <VenderName>{venderName}</VenderName>}
          {venderLogo && <VenderLogo imageUrl={venderLogo}></VenderLogo>}
        </CardContent>
      </GradientBg>
    </CardVendorBg>
  );
};

export default CardVendor;
