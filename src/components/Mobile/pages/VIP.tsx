import styled from "styled-components";

const VIPWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${(props: { theme: { primaryDark: any; }; }) => props.theme.primaryDark};
    color: ${(props: { theme: { white: any; }; }) => props.theme.white};
`;

const VIP = () => {
    return (
        <VIPWrapper>
            VIP
        </VIPWrapper>
    )
}

export default VIP