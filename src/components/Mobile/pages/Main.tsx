import banner from "@/assets/images/home/mobile/banner_1.png";
import CardPrompt from "@/components/Mobile/components/CardPrompt";
import Category from "@/components/Mobile/components/Category";
import Tab from "@/components/Mobile/components/Tab";
import Tag from "@/components/Mobile/components/Tag";
import styled from "styled-components";

const MainWrapper = styled.div`
    width: 100%;
    /* height: 100vh; */
    padding: 22px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${(props: { theme: { primaryDark: any; }; }) => props.theme.primaryDark};
    color: ${(props: { theme: { white: any; }; }) => props.theme.white};
    margin-bottom: 82px;
`;

const Banner = styled.div`
    width: 100%;
    padding-top: 62.5%;
    margin-bottom: 15px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${banner});
    border-radius: 12px;
`;

type Props = {};
const Main = (props: Props) => {
    return <MainWrapper>
        <Banner></Banner>
        <CardPrompt />
        <Tab />
        <Tag />
        <Category />
    </MainWrapper>
};

export default Main;
