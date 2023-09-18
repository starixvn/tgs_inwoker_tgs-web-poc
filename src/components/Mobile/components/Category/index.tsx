import styled from 'styled-components';
import Category from "./category";

const Container = styled.div`
    display: flex;
    margin-bottom: 15px;
    width: 100%;
`;

const CategoryContainer = () => {
    return (
        <Container>
            <Category />
        </Container>
    );
};

export default CategoryContainer;