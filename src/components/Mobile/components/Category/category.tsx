import example from "@/assets/images/home/mobile/example.png";
import hotIcon from "@/assets/images/home/mobile/hot.svg";
import venderLogo from "@/assets/images/home/mobile/vendor_logo.png";
import ButtonText from '@/components/Mobile/components/ButtonText';
import CardVendor from '@/components/Mobile/components/CardVender';
import CategoryLabel from '@/components/Mobile/components/CategoryLabel';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    margin: 15px 0;
`;

const CategoryTitle = styled.div`    
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const CategoryContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 15px;
    width: 100%;
    margin-bottom: 30px;
`;

const ButtonContainer = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Category = () => {
    return (
        <Wrapper>
            <CategoryTitle>
                <CategoryLabel imageUrl={hotIcon} text={"Hot"} />
                <ButtonText size="small" text={"View all"} />
            </CategoryTitle>

            <CategoryContent>
                <CardVendor
                    imageUrl={example}
                    gameName={"SLOT"}
                    venderName={"PG SLOTS"}
                />
                <CardVendor
                    imageUrl={example}
                    venderLogo={venderLogo}
                />
            </CategoryContent>

            <ButtonContainer>
                <ButtonText size="large" text={"Load more"} />
            </ButtonContainer>
        </Wrapper>
    );
};

export default Category;