import styled from "styled-components";

const EmptyImage = styled.div`
  width: 100%;
  height: calc(100vh - 80px - 82px);
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/mobile/promotion/empty.png`})
    no-repeat center center;
  background-size: cover;
`;

const EmptyPage = () => {
  return <EmptyImage />;
};

export default EmptyPage;
